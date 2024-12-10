import classNames from "classnames/bind";

import DetailVideo from "~/components/DetailVideo";
import styled from "./Detail.module.scss";

const cx = classNames.bind(styled);
function Detail() {
  return (
    <div className={cx("container")}>
      <DetailVideo></DetailVideo>
    </div>
  );
}

export default Detail;
