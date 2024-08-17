import classNames from "classnames/bind";
import style from "./HistoryItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function HistoryItem({ children, onRemove }) {
  const handleRemove = () => {
    if (onRemove) {
      onRemove(children); // Gửi nội dung phần tử để xóa
    }
  };
  return (
    <Link to={`/search?q=${children}`}>
      <li className={cx("history-item")}>
        <FontAwesomeIcon
          className={cx("history-icon__clock")}
          icon={faClock}
        ></FontAwesomeIcon>
        <h4 className={cx("history-content")}>{children}</h4>
        <FontAwesomeIcon
          className={cx("history-icon__x")}
          icon={faXmark}
          onClick={handleRemove}
        ></FontAwesomeIcon>
      </li>
    </Link>
  );
}

HistoryItem.propTypes = {
  children: PropTypes.node.isRequired,
  onRemove: PropTypes.func,
};

export default HistoryItem;
