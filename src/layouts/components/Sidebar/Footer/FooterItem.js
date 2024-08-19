import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function FooterItem({ title, fLinkArray = [] }) {
  return (
    <>
      <h4 role="button" className={cx("linklist-header")}>
        {title}
      </h4>
      <div className={cx("link-container")}>
        {fLinkArray.map((link) => (
          <Link to={link.to}>{link.title}</Link>
        ))}
      </div>
    </>
  );
}

export default FooterItem;
