import classNames from "classnames/bind";
import Select, { components } from "react-select";
import { useState, useEffect, useCallback } from "react";

import {
  ArrowIcon,
  OpenEyeIcon,
  CloseEyeIcon,
  WarningIcon,
  DropdownIcon,
} from "~/components/Icons";
import Button from "~/components/Button";
import styles from "./LoginForm.module.scss";
import { Link } from "react-router-dom";

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
  indicatorSeparator: (styles) => ({
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
  option: (styles, { isSelected, isFocused }) => ({
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
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "rgba(255, 255, 255, 0.9)",
  }),
};

const cx = classNames.bind(styles);

function SignUpForm() {
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

    setIsDisable(!(isEmailValid && isPasswordValid && isDateValid));
  }, [
    inputEmail,
    inputPhone,
    inputPassword,
    selectedDay,
    selectedMonth,
    selectedYear,
  ]);

  return (
    <form>
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
      >
        Đăng ký
      </Button>
    </form>
  );
}

export default SignUpForm;
