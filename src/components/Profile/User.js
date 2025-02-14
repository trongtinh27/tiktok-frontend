import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";

import useCheckLogin from "~/hooks/useCheckLogin";
import Image from "~/components/Image";
import Button from "~/components/Button";
import { useUser } from "~/contexts/UserContext";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as followService from "~/services/followService";
import { VerifyBadge, EditIcon, FollowCheckIcon } from "~/components/Icons";
import EditProfileModal from "./components/EditProfile";
import FollowModal from "./components/FollowPopup";
import styles from "./User.module.scss";

const cx = classNames.bind(styles);

function User({ profile, userStatus }) {
  const checkLogin = useCheckLogin();

  // axiosInstance
  const axiosInstance = useAxiosWithInterceptor();
  // UserContext
  const { user } = useUser();

  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isOpenFollowPopup, setIsOpenFollowPopup] = useState(false);
  const [followStatus, setFollowStatus] = useState(userStatus);

  const [tabState, setTabState] = useState("following");

  const handleOpenEditProfile = () => {
    setIsOpenEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setIsOpenEditProfile(false);
  };

  const handleOpenFollowPopup = (e) => {
    checkLogin(() => {
      setTabState(e);
      setIsOpenFollowPopup(true);
    });
  };

  const handleCloseFollowPopup = () => {
    setIsOpenFollowPopup(false);
  };

  const handleClickFollow = () => {
    checkLogin(async () => {
      const followRequest = {
        followerId: profile.id,
        followedId: user.id,
      };
      const callToggleFollowApi = await followService.toggleFollow(
        axiosInstance,
        followRequest
      );

      if (callToggleFollowApi.status === 200) {
        setFollowStatus(
          callToggleFollowApi.data.following ? "following" : "unfollow"
        );
      }
    });
  };

  useEffect(() => {
    // Nếu user đã đăng nhập thì mới kiểm tra follow
    const loadProfile = async () => {
      if (user && user.id) {
        const resFollow = await followService.checkFollowApi(
          axiosInstance,
          profile.id,
          user.id
        );
        if (resFollow.status === 200) {
          const checkFollow = resFollow.data;
          if (checkFollow.mutualFollowing) {
            setFollowStatus("mutualFollowing");
          } else if (checkFollow.following) {
            setFollowStatus("following");
          } else {
            setFollowStatus("unfollow");
          }
        }
      }
    };
    if (user?.username === profile?.username) {
      setFollowStatus("profile");
    } else {
      loadProfile();
    }
  }, [followStatus, user, profile, axiosInstance]);

  return (
    <div className={cx("profile-container")}>
      <div className={cx("info")}>
        <div className={cx("avatar-container")}>
          <span role="button" className={cx("avatar")}>
            <Image src={profile?.avatarURL} />
          </span>
        </div>
        <div className={cx("title-container")}>
          <div className={cx("identifier-wrapper")}>
            <div className={cx("name")}>
              <h1 className={cx("username")}>
                {profile?.username}
                {profile?.verify && <VerifyBadge width="20px" height="20px" />}
              </h1>
              <h2 className={cx("full-name")}> {profile?.fullName}</h2>
            </div>
          </div>
          {
            /* Profile */
            followStatus === "profile" && (
              <div className={cx("edit-container")}>
                <Button
                  onClick={handleOpenEditProfile}
                  className={cx("edit-btn")}
                  leftIcon={<EditIcon />}
                >
                  Sửa hồ sơ
                </Button>
              </div>
            )
          }

          {
            /* un follow */
            followStatus === "unfollow" && (
              <div className={cx("follow-container")}>
                <Button
                  onClick={handleClickFollow}
                  className={cx("follow-btn")}
                >
                  Follow
                </Button>
              </div>
            )
          }

          {
            /* follow */
            followStatus === "following" && (
              <div className={cx("follow-container")}>
                <Button
                  onClick={handleClickFollow}
                  outline
                  className={cx("edit-btn")}
                  leftIcon={<FollowCheckIcon />}
                >
                  Hủy follow
                </Button>
              </div>
            )
          }

          {
            /* follow */
            followStatus === "mutualFollowing" && (
              <div className={cx("message-container")}>
                <Button outline to="/messages" className={cx("message-btn")}>
                  Tin nhắn
                </Button>
                <Tippy delay={[0, 200]} content="Bỏ follow" placement="bottom">
                  <div>
                    <Button
                      onClick={handleClickFollow}
                      onlyIcon
                      className={cx("follow-check-btn")}
                      leftIcon={<FollowCheckIcon />}
                    ></Button>
                  </div>
                </Tippy>
              </div>
            )
          }
        </div>
      </div>
      <h3 className={cx("count-infos")}>
        <div
          role="button"
          className={cx("count-container")}
          onClick={() => {
            handleOpenFollowPopup("following");
          }}
        >
          <strong>{profile?.followingCount}</strong>
          <span>Đang Follow</span>
        </div>
        <div
          role="button"
          className={cx("count-container")}
          onClick={() => handleOpenFollowPopup("follower")}
        >
          <strong>{profile?.followerCount}</strong>
          <span>Follower</span>
        </div>
      </h3>
      <h2 className={cx("bio")}>{profile?.bio || "Chưa có tiểu sử."}</h2>
      <EditProfileModal
        isOpen={isOpenEditProfile}
        onClose={handleCloseEditProfile}
        user={profile}
      />
      <FollowModal
        userInfo={profile}
        tab={tabState}
        isOpen={isOpenFollowPopup}
        onClose={handleCloseFollowPopup}
      />
    </div>
  );
}

export default User;
