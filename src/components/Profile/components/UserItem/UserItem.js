import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { VerifyBadge } from "~/components/Icons";
import Image from "~/components/Image";
import Button from "~/components/Button";
import styles from "./UserItem.module.scss";

const cx = classNames.bind(styles);
function UserItem({ userInfo }) {
  return (
    <div className={cx("container")}>
      <div className={cx("user-item")}>
        <Link to={`/@${userInfo?.tiktokID}`} className={cx("info-link")}>
          <span className={cx("avatar-container")}>
            <Image src={userInfo?.avatarURL} className={cx("avatar")} />
          </span>
          <div className={cx("user-info")}>
            <div className={cx("nickname-container")}>
              <span className={cx("nickname")}>
                {userInfo?.fullName}
                <span className={cx("verify-badge")}>
                  {userInfo?.verify && <VerifyBadge />}
                </span>
              </span>
            </div>
            <p className={cx("unique-id")}>{userInfo?.tiktokID}</p>
          </div>
        </Link>
        <div className={cx("button-container")}>
          <div className={cx("button-wrapper")}>
            <Button className={cx("btn-user")}>Đang Follow</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
