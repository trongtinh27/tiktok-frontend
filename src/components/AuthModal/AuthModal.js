import classNames from "classnames/bind";
import Modal from "react-modal";
import { useState } from "react";
import { Link } from "react-router-dom";

import { CloseIcon, BackIcon } from "~/components/Icons";
import styles from "./AuthModal.module.scss";
import { useAuth } from "../AuthModal";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/LoginForm/SignUpForm";

const cx = classNames.bind(styles);

function AuthModal() {
  const [stateAuth, setStateAuth] = useState("login");

  const { isOpenLogin, setIsOpenLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleCloseModal = () => {
    setIsLogin(true);
    setStateAuth("login");
    setIsOpenLogin(false);
  };

  const handleChangeAuth = () => {
    if (isLogin) {
      setStateAuth("signup");
    } else {
      setStateAuth("login");
    }
    setIsLogin((prevState) => !prevState);
  };

  const handleBack = () => {
    if (stateAuth === "loginform") {
      setStateAuth("login");
      setIsLogin(true);
    } else if (stateAuth === "signupform") {
      setStateAuth("signup");
      setIsLogin(false);
    }
  };

  return (
    <Modal
      isOpen={isOpenLogin}
      overlayClassName="Overlay"
      ariaHideApp={false}
      className={cx("wrapper")}
    >
      <div className={cx("mark")}></div>
      <div className={cx("content")}>
        <div className={cx("auth-modal")}>
          <div className={cx("container")}>
            {stateAuth === "loginform" || stateAuth === "signupform" ? (
              <>
                <div
                  role="button"
                  className={cx("back-btn")}
                  onClick={handleBack}
                >
                  <BackIcon />
                </div>
              </>
            ) : (
              ""
            )}
            <div className={cx("content")}>
              <div className={cx("login-container")}>
                <div className={cx("home-container ")}>
                  {stateAuth === "login" || stateAuth === "signup" ? (
                    isLogin ? (
                      <Login setStateAuth={setStateAuth} />
                    ) : (
                      <Signup setStateAuth={setStateAuth} />
                    )
                  ) : (
                    ""
                  )}
                  {stateAuth === "loginform" && <LoginForm />}
                  {stateAuth === "signupform" && <SignUpForm />}
                  {(stateAuth === "login" || stateAuth === "signup") && (
                    <>
                      <div className={cx("continue-with-container")}>
                        <div className={cx("separator-line")}></div>
                        <div className={cx("separator-text")}>HOẶC</div>
                        <div className={cx("separator-line")}></div>
                      </div>
                      <div className={cx("guest-mode-container")}>
                        <div
                          className={cx("guest-box")}
                          onClick={handleCloseModal}
                        >
                          <div className={cx("guest-text")}>
                            Tiếp tục với tư cách là khách
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={cx("agreement")}>
              <p className={cx("agreement-content")}>
                Bằng việc tiếp tục với tài khoản có vị trí tại&nbsp;
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/signup/country-selector"
                  className={cx("agreement-link")}
                >
                  Vietnam
                </a>
                , bạn đồng ý với&nbsp;
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/legal/terms-of-use?lang=vi-VN"
                  className={cx("agreement-link")}
                >
                  Điều khoản Sử dụng
                </a>
                , đồng thời xác nhận rằng bạn đã đọc&nbsp;
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/legal/privacy-policy?lang=vi-VN"
                  className={cx("agreement-link")}
                >
                  Chính sách Quyền riêng tư&nbsp;
                </a>
                của chúng tôi.
              </p>
            </div>
            <div className={cx("footer")}>
              <div className={cx("footer-text")}>
                {isLogin ? "Bạn không có tài khoản?" : "Bạn đã có tài khoản?"}
              </div>
              <Link
                to={""}
                className={cx("footer-link")}
                onClick={handleChangeAuth}
              >
                <span className={cx("link-title")}>
                  {isLogin ? "Đăng ký" : "Đăng nhập"}
                </span>
              </Link>
            </div>
          </div>
          <div className={cx("close-wrapper")} onClick={handleCloseModal}>
            <CloseIcon className={cx("close-icon")} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AuthModal;
