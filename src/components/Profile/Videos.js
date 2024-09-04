import classNames from "classnames/bind";

import { BlockIcon } from "~/components/Icons";
import VideoItem from "./VideoItem";
import styles from "./User.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function Videos() {
  const [feedTab, setFeedTab] = useState("post");

  const handleChangeTab = (tab) => {
    setFeedTab(tab);
  };

  return (
    <div className={cx("video-wrapper")}>
      <div className={cx("feed-tab-container")}>
        <div className={cx("video-feel-tab")}>
          <p
            className={cx("video-post", feedTab === "post" ? "active" : "")}
            onClick={() => handleChangeTab("post")}
          >
            <span>Video</span>
          </p>
          <p
            className={cx(
              "video-favorite",
              feedTab === "favorite" ? "active" : ""
            )}
            onClick={() => handleChangeTab("favorite")}
          >
            <BlockIcon />
            <span>Yêu thích</span>
          </p>
          <p
            className={cx(
              "video-collect",
              feedTab === "collect" ? "active" : ""
            )}
            onClick={() => handleChangeTab("collect")}
          >
            <BlockIcon />
            <span>Đã lưu</span>
          </p>
          <div
            className={cx(
              "buttom-line",
              feedTab === "post"
                ? "post-line"
                : feedTab === "favorite"
                ? "favorite-line"
                : "collect-line"
            )}
          ></div>
        </div>
      </div>
      <div className={cx("detail-container")}>
        <div className={cx("content-list")}>
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
        </div>
      </div>
    </div>
  );
}

export default Videos;
