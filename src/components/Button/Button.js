import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";

import style from "./Button.module.scss";

const cx = classNames.bind(style);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  medium = false,
  large = false,
  upload = false,
  text = false,
  logout = false,
  loading = false,
  disabled,
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
  let Comp = "button";

  const props = {
    onClick,
    ...passProps,
  };

  if (disabled) {
    delete props.onClick;
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = cx("wrapper", {
    [className]: className,
    disabled,
    primary,
    outline,
    text,
    medium,
    large,
    upload,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      {loading ? (
        <ReactLoading type="spin" width={20} height={20} />
      ) : (
        <span className={cx("title")}>{children}</span>
      )}
      {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
    </Comp>
  );
}

Button.prototype = {
  to: PropTypes.string,
  href: PropTypes.string,
  outline: PropTypes.bool,
  primary: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  upload: PropTypes.bool,
  text: PropTypes.bool,
  logout: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
