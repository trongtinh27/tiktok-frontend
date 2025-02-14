import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { BlockIcon, EmtyIcon } from "~/components/Icons";
import VideoItem from "./VideoItem";
import * as videoService from "~/services/videoService";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";

import styles from "./User.module.scss";

const cx = classNames.bind(styles);

function Videos({ username }) {
  const axiosInstance = useAxiosWithInterceptor();

  const [feedTab, setFeedTab] = useState("post");
  const [videoList, setVideoList] = useState([]);
  const actualUsername = username?.slice(1);

  const handleChangeTab = (tab) => {
    setFeedTab(tab);
  };

  const loadVideo = async (actualUsername) => {
    try {
      const res = await videoService.getVideoByUser(
        axiosInstance,
        actualUsername
      );
      if (res.status === 200) {
        setVideoList(res.data);
      }
    } catch (error) {
      console.error("Error loading videos:", error);
    }
  };

  useEffect(() => {
    loadVideo(actualUsername);
  }, [actualUsername]); // eslint-disable-line react-hooks/exhaustive-deps

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
        {videoList?.length !== 0 ? (
          <div className={cx("content-list")}>
            {videoList?.map((video) => (
              <VideoItem key={video.id} videoData={video} />
            ))}
          </div>
        ) : (
          <div className={cx("emty")}>
            <div className={cx("emty-container")}>
              <div className={cx("emty-icon")}>
                <EmtyIcon
                  className={cx("icon")}
                  width="40px"
                  height="40px"
                ></EmtyIcon>
              </div>
              <p className={cx("emty-title")}>Không có nội dung</p>
              <p className={cx("emty-content")}>Không có Video để hiển thị</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Videos;
