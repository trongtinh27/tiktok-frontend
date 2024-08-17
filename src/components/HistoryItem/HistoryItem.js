import classNames from "classnames/bind";
import style from "./HistoryItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const cx = classNames.bind(style);

function HistoryItem({ children }) {
  return (
    <li className={cx("history-item")}>
      <FontAwesomeIcon
        className={cx("history-icon__clock")}
        icon={faClock}
      ></FontAwesomeIcon>
      <h4 className={cx("history-content")}>{children}</h4>
      <FontAwesomeIcon
        className={cx("history-icon__x")}
        icon={faXmark}
      ></FontAwesomeIcon>
    </li>
  );
}

HistoryItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HistoryItem;
