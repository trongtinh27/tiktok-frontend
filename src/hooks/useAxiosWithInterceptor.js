import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useMemo } from "react";

const useAxiosWithInterceptor = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "tiktok-jwt-refresh",
  ]);

  const httpRequest = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:8080/",
      headers: {
        "Content-Type": "application/json",
        "Refresh-token": cookies["tiktok-jwt-refresh"],
      },
      withCredentials: true,
    });
  }, [cookies["tiktok-jwt-refresh"]]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const requestInterceptor = httpRequest.interceptors.request.use(
      (config) => {
        const accessToken = cookies.token;

        if (accessToken) {
          try {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          } catch (error) {
            Promise.reject(error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = httpRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error);

        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await httpRequest.post(
              "auth/refreshToken",
              {},
              {
                headers: {
                  "Refresh-token": cookies["tiktok-jwt-refresh"],
                },
              }
            );

            if (response.status === 200) {
              setCookie("token", response.data.data.token, {
                path: "/",
                maxAge: response.data.data.tokenExpiration / 1000,
              });

              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${response.data.data.token}`;

              return httpRequest(originalRequest);
            }
          } catch (refreshError) {
            removeCookie("token", { path: "/" });
            removeCookie("tiktok-jwt-refresh", { path: "/" });
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      httpRequest.interceptors.request.eject(requestInterceptor);
      httpRequest.interceptors.response.eject(responseInterceptor);
    };
  }, [cookies, httpRequest, removeCookie, setCookie]); // eslint-disable-next-line

  return httpRequest;
};

export default useAxiosWithInterceptor;
