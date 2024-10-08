import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./AccountFollow.module.scss";

const cx = classNames.bind(styles);

function AccountFollow({ children, hasMore, handleShowMore }) {
  return (
    <div className={cx("user-container")}>
      <h2 className={cx("title")}>Các tài khoản Đã follow</h2>
      <ul className={cx("account-list")}>{children}</ul>
      {hasMore && (
        <button className={cx("btn-show-more")} onClick={handleShowMore}>
          <p className={cx("text-show-more")}>Xem thêm</p>
        </button>
      )}
    </div>
  );
}

AccountFollow.propTyptes = {
  children: PropTypes.node.isRequired,
};

export default AccountFollow;
