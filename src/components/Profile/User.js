import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";

import Image from "~/components/Image";
import Button from "~/components/Button";
import { VerifyBadge, EditIcon, FollowCheckIcon } from "~/components/Icons";
import EditProfileModal from "./components/EditProfile";
import FollowModal from "./components/FollowPopup";
import styles from "./User.module.scss";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function User() {
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
    setTabState(e);
    setIsOpenFollowPopup(true);
  };

  const handleCloseFollowPopup = () => {
    setIsOpenFollowPopup(false);
  };
  return (
    <div className={cx("profile-container")}>
      <div className={cx("info")}>
        <div className={cx("avatar-container")}>
          <span role="button" className={cx("avatar")}>
            <Image src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/579e8895677e86683abb0f2a1583a44e.jpeg?lk3s=a5d48078&nonce=69997&refresh_token=eb3faf5de07e7ae8509d285acef1c433&x-expires=1724756400&x-signature=gNtaJR7tt5u97gxNK50P8HReafY%3D&shp=a5d48078&shcp=81f88b70" />
          </span>
        </div>
        <div className={cx("title-container")}>
          <div className={cx("identifier-wrapper")}>
            <div className={cx("name")}>
              <h1 className={cx("username")}>
                tinhsubo
                <VerifyBadge width="20px" height="20px" />
              </h1>
              <h2 className={cx("full-name")}>Le Trong Tinh</h2>
            </div>
          </div>
          {
            /* Profile */
            <div className={cx("edit-container")}>
              <Button
                onClick={handleOpenEditProfile}
                className={cx("edit-btn")}
                leftIcon={<EditIcon />}
              >
                Sửa hồ sơ
              </Button>
            </div>
          }
          {/* follow */
          /* <div className={cx("follow-container")}>
            <Button className={cx("follow-btn")}>Follow</Button>
          </div> */}

          {
            /* un follow */
            // <div className={cx("message-container")}>
            //   <Button outline to="/message" className={cx("message-btn")}>
            //     Tin nhắn
            //   </Button>
            //   <Tippy delay={[0, 200]} content="Bỏ follow" placement="bottom">
            //     <div>
            //       <Button
            //         onlyIcon
            //         className={cx("follow-check-btn")}
            //         leftIcon={<FollowCheckIcon />}
            //       ></Button>
            //     </div>
            //   </Tippy>
            // </div>
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
          <strong>851</strong>
          <span>Đang Follow</span>
        </div>
        <div
          role="button"
          className={cx("count-container")}
          onClick={() => handleOpenFollowPopup("follower")}
        >
          <strong>851</strong>
          <span>Follower</span>
        </div>
      </h3>
      <h2 className={cx("bio")}>Chưa có tiểu sử.</h2>
      <EditProfileModal
        isOpen={isOpenEditProfile}
        onClose={handleCloseEditProfile}
      />
      <FollowModal
        tab={tabState}
        isOpen={isOpenFollowPopup}
        onClose={handleCloseFollowPopup}
      />
    </div>
  );
}

export default User;
