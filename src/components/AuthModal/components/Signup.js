import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";

import {
  UserIcon,
  FacebookIcon,
  GoogleIcon,
  LineIcon,
} from "~/components/Icons";
import styles from "../AuthModal.module.scss";

const cx = classNames.bind(styles);

function Signup({ setStateAuth }) {
  const handleSignUpWithAccount = () => {
    setStateAuth("signupform");
  };

  return (
    <>
      <h2 className={cx("login-title")}>Đăng ký TikTok</h2>
      <div className={cx("login-option-container", "login-modal")}>
        {/* Số điện thoại / Email / TikTok ID */}
        <div className={cx("login-option")} onClick={handleSignUpWithAccount}>
          <div className={cx("logo")}>
            <UserIcon width="20px" height="20px" />
          </div>
          <div className={cx("option-title")}>
            <div className={cx("title")}>Số điện thoại hoặc email</div>
          </div>
        </div>
        {/* Facebook */}
        <Tippy delay={[0, 200]} content="Đang phát triển" placement="left">
          <div className={cx("login-option")}>
            <div className={cx("logo")}>
              <FacebookIcon width="20px" height="20px" />
            </div>
            <div className={cx("option-title")}>
              <div className={cx("title")}>Tiếp tục với Facebook</div>
            </div>
          </div>
        </Tippy>
        {/* Google */}
        <Tippy delay={[0, 200]} content="Đang phát triển" placement="left">
          <div className={cx("login-option")}>
            <div className={cx("logo")}>
              <GoogleIcon width="20px" height="20px" />
            </div>
            <div className={cx("option-title")}>
              <div className={cx("title")}>Tiếp tục với Google</div>
            </div>
          </div>
        </Tippy>
        {/* LINE */}
        <Tippy delay={[0, 200]} content="Đang phát triển" placement="left">
          <div className={cx("login-option")}>
            <div className={cx("logo")}>
              <LineIcon width="20px" height="20px" />
            </div>
            <div className={cx("option-title")}>
              <div className={cx("title")}>Tiếp tục với LINE</div>
            </div>
          </div>
        </Tippy>
      </div>
    </>
  );
}

export default Signup;
