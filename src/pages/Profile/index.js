import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import { useUser } from "~/contexts/UserContext";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as userService from "~/services/userService";
import * as followService from "~/services/followService";
import User, { Videos } from "~/components/Profile";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile() {
  const axiosInstance = useAxiosWithInterceptor();
  const { user } = useUser();
  const { username } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null); // Khởi tạo là null
  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    if (username && username.startsWith("@")) {
      const actualUsername = username.slice(1);

      const loadProfile = async (actualUsername) => {
        try {
          const resAuth = await userService.profileByUsernameApi(
            axiosInstance,
            actualUsername
          );
          setUserInfo(resAuth.data);

          // Nếu user đã đăng nhập thì mới kiểm tra follow
          if (user && user.id) {
            const resFollow = await followService.checkFollowApi(
              axiosInstance,
              resAuth.data.id,
              user.id
            );
            if (resFollow.status === 200) {
              const checkFollow = resFollow.data;
              if (checkFollow.mutualFollowing) {
                setUserStatus("mutualFollowing");
              } else if (checkFollow.following) {
                setUserStatus("following");
              } else {
                setUserStatus("unfollow");
              }
            } else {
              setUserStatus("unfollow");
            }
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      };

      // Kiểm tra nếu user đang đăng nhập và username trùng khớp
      if (user?.username === actualUsername) {
        setUserInfo(user);
        setUserStatus("profile");
      } else {
        loadProfile(actualUsername);
      }
    } else {
      navigate("/404"); // Điều hướng đến trang 404 nếu username không hợp lệ
    }
  }, [axiosInstance, username, user, navigate]);

  return (
    <div className={cx("user-container")}>
      <div className={cx("content")}>
        <div className={cx("center")}>
          {userInfo ? (
            <>
              <User profile={userInfo} userStatus={userStatus} />
              <Videos username={username} />
            </>
          ) : (
            <p>Loading...</p> // Hiển thị loading trong khi đợi dữ liệu
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
