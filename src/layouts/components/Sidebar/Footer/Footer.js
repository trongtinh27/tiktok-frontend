import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import PropTypes from "prop-types";
import Image from "~/components/Image";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function Footer({ children }) {
  return (
    <div className={cx("footer-container")}>
      <div className={cx("effecthousetrance-container")}>
        <a
          href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main"
          className={cx("eht-link")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={cx("effecthousetrance-content")}>
            <Image
              src={images.footer}
              className={cx("effecthousetrance-image")}
            />
            <div className={cx("effecthousetrance-title-container")}>
              <div className={cx("effecthousetrance-title")}>
                <h4 className={cx("title")}>
                  Tạo hiệu ứng TikTok, nhận phần thưởng
                </h4>
              </div>
            </div>
          </div>
        </a>
      </div>
      {children}
      <div role="button" className={cx("more-container")}>
        <span className={cx("more")}>Thêm</span>
      </div>
      <span className={cx("copyright")}>@ 2024 TikTok</span>
    </div>
  );
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
