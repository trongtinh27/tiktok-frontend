import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { VerifyBadge } from "~/components/Icons";
import Image from "~/components/Image";
import styles from "./AccountFollow.module.scss";

const cx = classNames.bind(styles);

function AccountFollowItem({ accountData }) {
  return (
    <li>
      <Link to={`/@${accountData?.tiktokID}`}>
        <div className={cx("user-link-container")}>
          <div className={cx("style-user-avatar")}>
            <span className={cx("avatar-container")}>
              <Image
                src={accountData?.avatarURL}
                alt="avatar"
                className={cx("avatar")}
              />
            </span>
          </div>
          <div className={cx("user-content-link")}>
            <div className={cx("user-title-container")}>
              <span className={cx("user-title")}>{accountData?.tiktokID}</span>
              <div className={cx("following-user-bluev")}>
                <span className={cx("verify-badge")}>
                  {accountData?.verify && <VerifyBadge />}
                </span>
              </div>
            </div>
            <p className={cx("user-fullname")}>{accountData?.fullName}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

AccountFollowItem.propTypes = {
  accountData: PropTypes.any,
};

export default AccountFollowItem;
