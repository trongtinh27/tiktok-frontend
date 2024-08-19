import classNames from "classnames/bind";
import style from "./Default.module.scss";
import Header from "~/layouts/components/Header";
import SideBar from "~/layouts/components/Sidebar";
import PropTypes from "prop-types";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  const currentUser = false;
  return (
    <div className={cx("wrapper")}>
      <Header currentUser={currentUser} />
      <div className={cx("container")}>
        <SideBar currentUser={currentUser} />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
