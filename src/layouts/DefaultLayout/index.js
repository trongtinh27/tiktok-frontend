import classNames from "classnames/bind";
import style from "./Default.module.scss";
import Header from "~/layouts/components/Header";
import SideBar from "./Sidebar";
import PropTypes from "prop-types";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <SideBar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
