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
      <div className={cx("user-link-container")}>
        <Link>
          <div className={cx("style-user-avatar")}>
            <span className={cx("avatar-container")}>
              <Image
                src="https://p9-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/9862d3eae32d1828aa7180d3e167684d.jpeg?lk3s=a5d48078&nonce=82929&refresh_token=60f6caac2a423a704b099c801962d66b&x-expires=1724209200&x-signature=pw6dpllPPRkXn6szYipWoZ9Oh6o%3D&shp=a5d48078&shcp=81f88b70"
                alt="avatar"
                className={cx("avatar")}
              />
            </span>
          </div>
        </Link>
        <Link className={cx("user-content-link")}>
          <div className={cx("user-title-container")}>
            <span className={cx("user-title")}>imtuyet_</span>
            <div className={cx("following-user-bluev")}>
              <span className={cx("verify-badge")}>
                {/* icon */}
                <VerifyBadge />
              </span>
            </div>
          </div>
          <p className={cx("user-fullname")}>Ngọc Tuyết</p>
        </Link>
      </div>
    </li>
  );
}

AccountFollowItem.propTypes = {
  accountData: PropTypes.any,
};

export default AccountFollowItem;
