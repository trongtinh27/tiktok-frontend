import classNames from "classnames/bind";
import style from "./Menu.module.scss";
import Button from "~/components/Button";
import PropTypes from "prop-types";

const cx = classNames.bind(style);

function MenuItem({ data, onClick }) {
  const logout = !!data.logout ? "logout" : "";
  return (
    <Button
      upload
      className={cx("setting-item", logout)}
      leftIcon={data.icon}
      to={data.to}
      onClick={onClick}
    >
      {data.title}
    </Button>
  );
}

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
