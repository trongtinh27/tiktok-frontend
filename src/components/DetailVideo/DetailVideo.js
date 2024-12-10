import classNames from "classnames/bind";

import Video from "./Video";
import Content from "./Content";
import styled from "./DetailVideo.module.scss";

const cx = classNames.bind(styled);

function DetailVideo() {
  const video = {
    id: 12,
    userId: 3,
    username: "admin",
    userAvatar:
      "https://res.cloudinary.com/dsnt37ad4/image/upload/v1731303652/z9zb1g4jhcdizw7dr3sm.png",
    thumbnailUrl:
      "http://res.cloudinary.com/dsnt37ad4/image/upload/v1731302156/axlfhmfhcucabfazyst7.png",
    videoUrl:
      "http://res.cloudinary.com/dsnt37ad4/video/upload/v1731302151/awv9xduyspg7pi30rrcg.mp4",
    description: "2024-03-05 21-24-07.mp4",
    shape: "horizontal",
    commentCount: 0,
    likeCount: 0,
    collectCount: 0,
    followStatus: false,
    likeStatus: false,
    collectStatus: false,
  };
  return (
    <>
      <div className={cx("video-container")}>
        <Video video={video}></Video>
      </div>
      <div className={cx("content-container")}>
        <Content video={video}></Content>
      </div>
    </>
  );
}

export default DetailVideo;
