import classNames from "classnames/bind";
import Select, { components } from "react-select";
import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import {
  ArrowIcon,
  OpenEyeIcon,
  CloseEyeIcon,
  WarningIcon,
  DropdownIcon,
} from "~/components/Icons";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import Button from "~/components/Button";
import * as authService from "~/services/authService";
import styles from "./LoginForm.module.scss";

// Date data
const days = Array.from({ length: 31 }, (_, i) => ({
  label: (i + 1).toString(),
  value: (i + 1).toString(),
}));

const months = Array.from({ length: 12 }, (_, i) => ({
  label: "Tháng " + (i + 1).toString(),
  value: (i + 1).toString(),
}));

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => ({
  label: (currentYear - i).toString(),
  value: (currentYear - i).toString(),
}));

// Select Styles

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <DropdownIcon
        style={{
          transition: "transform 0.2s ease",
          transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </components.DropdownIndicator>
  );
};

const selectorStyles = {
  control: (styles) => ({
    ...styles,
    minWidth: "115px",
    height: "44px",
    display: "flex",
    marginRight: "10px",
    justifyContent: "space-between",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.34)",
    borderColor: "transparent",
    fontSize: "16px",
    background: "rgba(255, 255, 255, 0.12)",
    borderRadius: "4px",
    position: "relative",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": { borderColor: "transparent" },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: "0",
    paddingRight: "8px",
    color: "rgba(255, 255, 255, 0.9)",

    "&:hover": { color: "rgba(255, 255, 255, 0.9)" },
  }),
  indicatorSeparator: () => ({
    display: "none", // Ẩn đường phân cách
  }),
  input: (styles) => ({
    ...styles,
    caretColor: "transparent",
  }),
  menu: (styles) => ({
    ...styles,
    width: "120px",
    maxHeight: "320px",
    background: "rgb(18, 18, 18)",
    borderRadius: "4px",
    boxShadow: " rgba(0, 0, 0, 0.12) 0px 2px 12px",
    overflowY: "overlay",

    transition: " display 0.3s",
  }),
  option: (styles) => ({
    ...styles,
    height: "34px",
    overflow: "auto",
    fontSize: "16px",
    padding: "0px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.9)",
    background: "unset",
    "&:hover, &:focus": { background: "rgba(255, 255, 255, 0.04)" },
  }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles) => ({
    ...styles,
    color: "rgba(255, 255, 255, 0.9)",
  }),
};

const cx = classNames.bind(styles);

function SignUpForm() {
  const axiosInstance = useAxiosWithInterceptor();

  // Cookies
  const [, setCookie] = useCookies(["token", "tiktok-jwt-refresh"]);
  // State form
  const [signupWithEmail, setSignpWithEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Error
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Disable button
  const [isDisable, setIsDisable] = useState(true);
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Input
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  //   Select Date
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [birthday, setBirthday] = useState();

  const handleDayChange = (selectedOption) => setSelectedDay(selectedOption);
  const handleMonthChange = (selectedOption) =>
    setSelectedMonth(selectedOption);
  const handleYearChange = (selectedOption) => setSelectedYear(selectedOption);

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleSignUpMethod = useCallback(() => {
    setError(false);
    setErrorMessage("");
    setIsDisable(true);
    setIsLoading(false);
    setInputPhone("");
    setInputEmail("");
    setSignpWithEmail((prev) => !prev);
  }, []);

  const handleChangeInput = (setter) => (e) => {
    setter(e.target.value);
  };

  useEffect(() => {
    const isEmailValid = signupWithEmail
      ? inputEmail.length > 1
      : inputPhone.length === 10;
    const isPasswordValid = inputPassword.length >= 8;
    const isDateValid = selectedDay && selectedMonth && selectedYear;

    if (selectedDay && selectedMonth && selectedYear) {
      // Ensure the month is zero-indexed by subtracting 1
      const year = parseInt(selectedYear.value, 10);
      const month = parseInt(selectedMonth.value, 10) - 1; // Zero-index the month
      const day = parseInt(selectedDay.value, 10);

      // Create the Date object
      const date = new Date(year, month, day);

      // Manually format the date as YYYY-MM-DD
      const formattedDate =
        date.getFullYear() +
        "/" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "/" + // Month needs to be 1-indexed again
        String(date.getDate()).padStart(2, "0");

      // Set the formatted date
      setBirthday(formattedDate);
    }

    setIsDisable(!(isEmailValid && isPasswordValid && isDateValid));
  }, [
    inputEmail,
    inputPhone,
    inputPassword,
    selectedDay,
    selectedMonth,
    selectedYear,
    signupWithEmail,
  ]);

  // Handle register
  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const res = await authService.registerApi(
        axiosInstance,
        signupWithEmail,
        birthday,
        signupWithEmail ? inputEmail : inputPhone,
        inputPassword
      );
      if (res.status === 200) {
        setIsLoading(false);
        const result = res.data;

        if (result.data.status === 400) {
          setIsLoading(false);
          setError(true);
          setErrorMessage(result.data.message);
        } else if (result.status === 200) {
          const {
            token,
            refreshToken,
            tokenExpiration,
            refreshTokenExpiration,
          } = res.data.data;
          // console.log(data);
          // Lưu Access Token và Refresh Token
          setCookie("token", token, {
            path: "/",
            maxAge: tokenExpiration / 1000, // Đổi từ ms sang giây
          });
          setCookie("tiktok-jwt-refresh", refreshToken, {
            path: "/",
            maxAge: refreshTokenExpiration / 1000,
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      setError(true);
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className={cx("title")}>Đăng ký</h2>
      <div className={cx("description")}>Ngày sinh của bạn là ngày nào?</div>
      <div className={cx("date-selector-container")}>
        <Select
          components={{ DropdownIndicator }}
          styles={selectorStyles}
          placeholder="Tháng"
          options={months}
          onChange={handleMonthChange}
          value={selectedMonth}
        />
        <Select
          components={{ DropdownIndicator }}
          styles={selectorStyles}
          placeholder="Ngày"
          options={days}
          onChange={handleDayChange}
          value={selectedDay}
        />
        <Select
          components={{ DropdownIndicator }}
          styles={selectorStyles}
          placeholder="Năm"
          options={years}
          onChange={handleYearChange}
          value={selectedYear}
        />
      </div>
      <div className={cx("description-date")}>
        Ngày sinh của bạn sẽ không được hiển thị công khai.
      </div>
      <div className={cx("description")}>
        {signupWithEmail ? "Email" : "Điện thoại"}
        <Link to="" className={cx("des-link")} onClick={toggleSignUpMethod}>
          {signupWithEmail
            ? "Đăng ký bằng số điện thoại"
            : "Đăng ký bằng email"}
        </Link>
      </div>
      {signupWithEmail ? (
        <div className={cx("container")}>
          <div className={cx("emailid-input-container")}>
            <input
              className={cx("emailid-input")}
              type="text"
              placeholder="Địa chỉ email"
              onChange={handleChangeInput(setInputEmail)}
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
                name="mobile"
                autoComplete="tel-national"
                className={cx("phone-input")}
                minLength={10}
                maxLength={10}
                size={10}
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
            minLength={8}
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
      <Button
        loading={isLoading}
        disabled={isDisable}
        primary
        className={cx("btn-login")}
        onClick={handleRegister}
      >
        Đăng ký
      </Button>
    </form>
  );
}

export default SignUpForm;
