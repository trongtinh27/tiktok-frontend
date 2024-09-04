import classNames from "classnames/bind";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import * as authService from "~/services/authService";
import {
  ArrowIcon,
  OpenEyeIcon,
  CloseEyeIcon,
  WarningIcon,
} from "~/components/Icons";
import Button from "~/components/Button";
import styles from "./LoginForm.module.scss";

const cx = classNames.bind(styles);

function LoginForm() {
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Disable button
  const [isDisable, setIsDisable] = useState(true);
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  // Error
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Input
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmailOrID, setInputEmailOrID] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  // Cookies
  const [setCookie] = useCookies(["token"]);

  const toggleLoginMethod = useCallback(() => {
    setError(false);
    setErrorMessage("");
    setIsDisable(true);
    setInputPhone("");
    setInputEmailOrID("");
    setLoginWithEmail((prev) => !prev);
  }, []);

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleChangeInput = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setIsDisable(true);
    let dataLogin = null;

    try {
      if (loginWithEmail) {
        const res = await authService.loginApi(inputEmailOrID, inputPassword);
        dataLogin = res.data;
      } else {
        const res = await authService.loginApi(inputPhone, inputPassword);
        dataLogin = res.data;
      }

      if (dataLogin != null) {
        console.log("token: " + dataLogin);
        setCookie("token", dataLogin.token, {
          path: "/",
          maxAge: dataLogin.tokenExpiration / 1000,
        });
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
      setIsDisable(false);
    }
  };

  useEffect(() => {
    const isEmailLoginValid =
      inputEmailOrID.length > 1 && inputPassword.length >= 5;
    const isPhoneLoginValid =
      inputPhone.length === 10 && inputPassword.length >= 5;

    setIsDisable(!(loginWithEmail ? isEmailLoginValid : isPhoneLoginValid));
  }, [inputEmailOrID, inputPhone, inputPassword, loginWithEmail]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className={cx("title")}>Đăng nhập</h2>
      <div className={cx("description")}>
        {loginWithEmail ? "Email hoặc TikTok ID" : "Điện thoại"}
        <Link to="" className={cx("des-link")} onClick={toggleLoginMethod}>
          {loginWithEmail
            ? "Đăng nhập bằng số điện thoại"
            : "Đăng nhập bằng email hoặc TikTok ID"}
        </Link>
      </div>
      {loginWithEmail ? (
        <div className={cx("container")}>
          <div className={cx("emailid-input-container")}>
            <input
              className={cx("emailid-input")}
              type="text"
              placeholder="Email hoặc TikTok ID"
              onChange={handleChangeInput(setInputEmailOrID)}
            />
          </div>
        </div>
      ) : (
        <div className={cx("container")}>
          <div className={cx("phone-input-container")}>
            <div className={cx("country-code")}>
              <div className={cx("area-selector")}>
                <span className={cx("country-code-lable")}>VN +84</span>
                <ArrowIcon className={cx("arrow-icon")} />
              </div>
            </div>
            <div className={cx("input-container")}>
              <input
                placeholder="Số điện thoại"
                type="tel"
                size={10}
                minLength={10}
                maxLength={10}
                name="mobile"
                autoComplete="tel-national"
                className={cx("phone-input")}
                onChange={handleChangeInput(setInputPhone)}
              />
            </div>
          </div>
        </div>
      )}
      <div className={cx("container")}>
        <div className={cx("password-input-container")}>
          <input
            className={cx("password-input", error && "warning")}
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            autoComplete="new-password"
            minLength={5}
            onChange={handleChangeInput(setInputPassword)}
          />
          <div className={cx("password-icon")}>
            {error && <WarningIcon className={cx("warning-icon")} />}
            <i role="button" onClick={handleShowPassword}>
              {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
            </i>
          </div>
        </div>
      </div>
      {error && (
        <div className={cx("alert-error")}>
          <span>{errorMessage}</span>
        </div>
      )}
      <div className={cx("link-container")}>
        <Link to="" className={cx("forget-password")}>
          Quên mật khẩu?
        </Link>
      </div>
      <Button
        loading={isLoading}
        disabled={isDisable}
        primary
        onClick={handleLogin}
        className={cx("btn-login")}
      >
        Đăng nhập
      </Button>
    </form>
  );
}

export default LoginForm;