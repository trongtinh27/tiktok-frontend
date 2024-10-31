import classNames from "classnames/bind";

import Uploader from "~/components/Uploader";
import styles from "./Upload.module.scss";

const cx = classNames.bind(styles);

function Upload() {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <Uploader></Uploader>
        </div>
      </div>
    </div>
  );
}

export default Upload;
