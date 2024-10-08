import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { useState } from "react";

import useCheckLogin from "~/hooks/useCheckLogin";
import Image from "~/components/Image";
import Button from "~/components/Button";
import { VerifyBadge, EditIcon, FollowCheckIcon } from "~/components/Icons";
import EditProfileModal from "./components/EditProfile";
import FollowModal from "./components/FollowPopup";
import styles from "./User.module.scss";

const cx = classNames.bind(styles);

function User({ user, userStatus }) {
  const checkLogin = useCheckLogin();

  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isOpenFollowPopup, setIsOpenFollowPopup] = useState(false);

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
    checkLogin(() => {});
  };

  return (
    <div className={cx("profile-container")}>
      <div className={cx("info")}>
        <div className={cx("avatar-container")}>
          <span role="button" className={cx("avatar")}>
            <Image src={user?.avatarURL} />
          </span>
        </div>
        <div className={cx("title-container")}>
          <div className={cx("identifier-wrapper")}>
            <div className={cx("name")}>
              <h1 className={cx("username")}>
                {user?.username}
                {user?.verify && <VerifyBadge width="20px" height="20px" />}
              </h1>
              <h2 className={cx("full-name")}> {user?.fullName}</h2>
            </div>
          </div>
          {
            /* Profile */
            userStatus === "profile" && (
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
            userStatus === "unfollow" && (
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
            userStatus === "following" && (
              <div className={cx("follow-container")}>
                <Button
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
            userStatus === "mutualFollowing" && (
              <div className={cx("message-container")}>
                <Button outline to="/message" className={cx("message-btn")}>
                  Tin nhắn
                </Button>
                <Tippy delay={[0, 200]} content="Bỏ follow" placement="bottom">
                  <div>
                    <Button
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
          <strong>{user?.followingCount}</strong>
          <span>Đang Follow</span>
        </div>
        <div
          role="button"
          className={cx("count-container")}
          onClick={() => handleOpenFollowPopup("follower")}
        >
          <strong>{user?.followerCount}</strong>
          <span>Follower</span>
        </div>
      </h3>
      <h2 className={cx("bio")}>{user?.bio || "Chưa có tiểu sử."}</h2>
      <EditProfileModal
        isOpen={isOpenEditProfile}
        onClose={handleCloseEditProfile}
        user={user}
      />
      <FollowModal
        userInfo={user}
        tab={tabState}
        isOpen={isOpenFollowPopup}
        onClose={handleCloseFollowPopup}
      />
    </div>
  );
}

export default User;
