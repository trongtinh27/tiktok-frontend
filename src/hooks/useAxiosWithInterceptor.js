import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useMemo } from "react";

const useAxiosWithInterceptor = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "tiktok-jwt-refresh",
  ]);

  const httpRequest = useMemo(
    () =>
      axios.create({
        baseURL: "http://localhost:8080/",
        withCredentials: true,
      }),
    []
  );

  useEffect(() => {
    // Thêm interceptor cho request
    const requestInterceptor = httpRequest.interceptors.request.use(
      (config) => {
        const accessToken = cookies.token;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Thêm interceptor cho response
    const responseInterceptor = httpRequest.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Kiểm tra lỗi 401 và xem đã thử refresh token chưa
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Gọi API refresh token
            const response = await httpRequest.post("auth/refreshToken", {});

            // Cập nhật lại token mới
            setCookie("token", response.data.token, {
              path: "/",
              maxAge: response.data.tokenExpiration / 1000,
            });

            // Thêm token mới vào request ban đầu
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${response.data.token}`;

            // Gửi lại request với token mới
            return httpRequest(originalRequest);
          } catch (refreshError) {
            if (refreshError.response?.status === 401) {
              // Nếu refresh token thất bại (401), thì logout
              removeCookie("token", { path: "/" });
              removeCookie("tiktok-jwt-refresh", { path: "/" });

              // Trả về lỗi để thông báo cho người dùng
              return Promise.reject(refreshError);
            }
            if (refreshError.response?.status === 500) {
              removeCookie("token", { path: "/" });
              removeCookie("tiktok-jwt-refresh", { path: "/" });

              // Trả về lỗi để thông báo cho người dùng
              return Promise.reject(refreshError);
            }

            // Nếu lỗi không phải 401, xử lý theo cách khác
            return Promise.reject(refreshError);
          }
        }

        // Nếu không phải lỗi 401 hoặc đã thử refresh token rồi
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors khi component unmount
    return () => {
      httpRequest.interceptors.request.eject(requestInterceptor);
      httpRequest.interceptors.response.eject(responseInterceptor);
    };
  }, [cookies.token, httpRequest, removeCookie, setCookie]);

  return httpRequest;
};

export default useAxiosWithInterceptor;
