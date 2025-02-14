import classNames from "classnames/bind";
import style from "./HistoryItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const cx = classNames.bind(style);

function HistoryItem({ children, setSearchValue, onRemove }) {
  const handleRemove = () => {
    if (onRemove) {
      onRemove(children); // Gửi nội dung phần tử để xóa
    }
  };

  const handleClickHistory = () => {
    setSearchValue(children);
  };
  return (
    <li className={cx("history-item")}>
      <span className={cx("history-link")} onClick={handleClickHistory}>
        <FontAwesomeIcon
          className={cx("history-icon__clock")}
          icon={faClock}
        ></FontAwesomeIcon>
        <h4 className={cx("history-content")}>{children}</h4>
      </span>
      <FontAwesomeIcon
        className={cx("history-icon__x")}
        icon={faXmark}
        onClick={handleRemove}
      ></FontAwesomeIcon>
    </li>
  );
}

HistoryItem.propTypes = {
  children: PropTypes.node.isRequired,
  onRemove: PropTypes.func,
};

export default HistoryItem;
