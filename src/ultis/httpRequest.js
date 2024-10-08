// import axios from "axios";
// import { useCookies } from "react-cookie";
// import { useUser } from "~/contexts/UserContext";

// const [cookies, setCookie, removeCookie] = useCookies(["token"]);
// const { logout } = useUser();

// const httpRequest = axios.create({
//   // baseURL: process.env.REACT_APP_BASE_URL,
//   baseURL: "http://localhost:8080/",
//   withCredentials: true,
// });

// httpRequest.interceptors.request.use(
//   async (config) => {
//     const accessToken = cookies.token;
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// httpRequest.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const response = await axios.post(`auth/refreshToken`, {});

//         // Cập nhật lại access token vào request ban đầu
//         originalRequest.headers[
//           "Authorization"
//         ] = `Bearer ${response.data.accessToken}`;

//         return httpRequest(originalRequest);
//       } catch (error) {
//         logout();
//       }
//     }
//   }
// );

// export const get = async (path, options = {}) => {
//   try {
//     const response = await httpRequest.get(path, options, {
//       withCredentials: true,
//     });
//     return response;
//   } catch (error) {
//     // Ném lỗi để có thể xử lý ở các phần khác
//     return error;
//   }
// };

// export const post = async (path, options = {}) => {
//   try {
//     const response = await httpRequest.post(path, options, {
//       withCredentials: true,
//     });

//     return response;
//   } catch (error) {
//     // Ném lỗi để có thể xử lý ở các phần khác
//     return error;
//   }
// };

// export default httpRequest;
