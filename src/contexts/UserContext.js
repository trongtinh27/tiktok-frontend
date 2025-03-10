import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useCookies } from "react-cookie";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as userService from "~/services/userService";
import * as authService from "~/services/authService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const axiosInstance = useAxiosWithInterceptor();
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "tiktok-jwt-refresh",
  ]);
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = cookies.token;

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const clearUser = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  // const logout =
  //   useCallback(async () => {
  //     const logoutFetch = await authService.logoutApi(axiosInstance, userId);

  //     if (logoutFetch?.status === 200) {
  //       clearUser();
  //       removeCookie("token", { path: "/" });
  //       removeCookie("tiktok-jwt-refresh", { path: "/" });
  //     }
  //   }, [clearUser, removeCookie, setCookie]); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = async (userId) => {
    const logoutFetch = await authService.logoutApi(axiosInstance, userId);

    if (logoutFetch?.status === 200) {
      clearUser();
      removeCookie("token", { path: "/" });
      removeCookie("tiktok-jwt-refresh", { path: "/" });
    }
  };

  useEffect(() => {
    const loadProfile = async (accessToken) => {
      try {
        const userInfo = await userService.profileApi(
          axiosInstance,
          accessToken
        );

        if (userInfo.status === 200) {
          updateUser(userInfo.data);

          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
    };

    loadProfile(cookies["tiktok-jwt-refresh"]);
  }, [token, cookies["tiktok-jwt-refresh"], axiosInstance]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, updateUser, clearUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
