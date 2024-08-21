import React, { useRef, useEffect, useState, useCallback } from "react";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

import Image from "~/components/Image";
import images from "~/assets/images";
import {
  MuteIcon,
  UnMuteIcon,
  PauseIcon,
  ResumeIcon,
} from "~/components/Icons";

import styles from "./HomeItem.module.scss";
import ActionItem from "./ActionItem";

const cx = classNames.bind(styles);

function HomeItem({ shape, videoData }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isFirstVideo, setIsFirstVideo] = useState(true); // Trạng thái để theo dõi video đầu tiên

  // Volume
  const [isMute, setIsMute] = useState(false);
  const [volumeValue, setVolumeValue] = useState(100);

  // Pause
  const [isPlaying, setIsPlaying] = useState(true);

  // Progress
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      const progressPercentage = (video.currentTime / video.duration) * 100;
      setProgress(progressPercentage);
    }
  }, []);

  const drawVideoOnCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    if (video && canvas && ctx) {
      const draw = () => {
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          updateProgress();
        }
        requestAnimationFrame(draw);
      };

      draw();
    }
  }, [updateProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new window.Image();
    image.src = "https://via.placeholder.com/56x100";
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    if (isPlaying) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Video nằm trong vùng nhìn thấy
              videoRef.current.muted = isMute;
              videoRef.current.play().catch((error) => {});
              drawVideoOnCanvas();
            } else {
              // Video ra khỏi vùng nhìn thấy
              if (isPlaying) {
                videoRef.current.pause();
              }
            }
          });
        },
        {
          threshold: 0.8, // 50% của phần tử phải xuất hiện trong vùng nhìn thấy để kích hoạt callback
        }
      );

      const container = containerRef.current;
      if (container) {
        observer.observe(container);
      }

      return () => {
        if (container) {
          observer.unobserve(container);
        }
      };
    } else {
      videoRef.current.pause();
      return;
    }
  }, [isMute, isPlaying, drawVideoOnCanvas]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        setIsFirstVideo(true); // Đặt trạng thái để video đầu tiên phát với âm thanh
        videoRef.current.play().catch((error) => {});
      }
    }
  };

  const handleMute = () => {
    setIsMute(!isMute);
  };

  const handleVolumeChange = (e) => {
    const newVolumeValue = Number(e.target.value);
    setVolumeValue(newVolumeValue);
    if (videoRef.current) {
      videoRef.current.volume = newVolumeValue / 100; // Chuyển đổi giá trị thanh trượt từ 0-100 sang 0-1
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      setIsPlaying((prevState) => !prevState);
    }
  };

  useEffect(() => {
    if (volumeValue > 0) {
      setIsMute(false);
    } else {
      setIsMute(true);
    } // Kiểm tra giá trị hiện tại
  }, [volumeValue]);

  return (
    <div ref={containerRef} className={cx("list-item-container")}>
      <div shape={shape} className={cx("content-container")}>
        <div shape={shape} className={cx("media")}>
          <div
            shape={shape}
            role="button"
            className={cx("media-card")}
            onClick={handlePlayVideo}
          >
            <canvas
              shape={shape}
              ref={canvasRef}
              width={56.25}
              height={100}
              className={cx("canvas-media")}
            ></canvas>
            <div className={cx("video-player-container")}>
              <div className={cx("video-player")}>
                <div className={cx("thumnail")}>
                  <span>
                    <picture>
                      <Image
                        src="https://p16-sign-useast2a.tiktokcdn.com/obj/tos-useast2a-p-0037-euttp/a8a3581534e64ef08f18c88b7ec5d0c7_1723728189?lk3s=b59d6b55&x-expires=1724288400&x-signature=l2w00qfmQDD4Zg%2Fr8dAGZSyT%2F04%3D"
                        className={cx("image-thumnail")}
                      />
                    </picture>
                  </span>
                </div>
                <div className={cx("basic-media")}>
                  <div className={cx("web-media")}>
                    <video
                      ref={videoRef}
                      crossOrigin="anonymous"
                      loop
                      playsInline
                      preload="auto"
                      muted={!isFirstVideo && isMute}
                      src={images.videoTest}
                    />
                  </div>
                </div>
              </div>
              <div className={cx("action-mask")}></div>
              <div className={cx("media-card-top")}>
                <div className={cx("media-controls")}>
                  <div className={cx("controls-center")}>
                    <div className={cx("audio-control")}>
                      {/* Tippy */}
                      <HeadlessTippy
                        offset={[55, -38]}
                        delay={[0, 500]}
                        interactive
                        render={(attrs) => (
                          <div
                            className={cx("volume-control-container")}
                            tabIndex="-1"
                            {...attrs}
                          >
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={volumeValue}
                              onChange={handleVolumeChange}
                              className={cx("volume-input")}
                            />
                          </div>
                        )}
                      >
                        <div className={cx("mute-icon")}>
                          {isMute ? (
                            <UnMuteIcon onClick={handleMute} />
                          ) : (
                            <MuteIcon onClick={handleMute} />
                          )}
                        </div>
                      </HeadlessTippy>
                    </div>
                  </div>
                  <div className={cx("controls-center")}>
                    <div className={cx("play-control")}>
                      <div
                        className={cx("play-icon")}
                        onClick={handlePlayPause}
                      >
                        {/* <MiniPlayerIcon /> */}
                        {isPlaying ? (
                          <Tippy
                            delay={[0, 200]}
                            content="Dừng"
                            placement="bottom"
                          >
                            <PauseIcon />
                          </Tippy>
                        ) : (
                          <Tippy
                            delay={[0, 200]}
                            content="Tiếp tục"
                            placement="bottom"
                          >
                            <ResumeIcon />
                          </Tippy>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("media-card-bottom")}>
                <div className={cx("author-container-wrapper")}>
                  <div className={cx("author-container")}>
                    <Link to="/@tinhsubo" className={cx("author-link")}>
                      <h3 className={cx("author-title")}>tinhsubo</h3>
                    </Link>
                  </div>
                </div>
                <div className={cx("description-container")}>
                  <div className={cx("multiline-text-container")}>
                    <div className={cx("multiline-text")}>
                      <div className={cx("multiline-text-content")}>
                        <span className={cx("text-content")}>
                          Tại sao có 2 New York và 2 Washington?
                        </span>
                      </div>
                    </div>
                    <button className={cx("button-expand")}>Thêm</button>
                  </div>
                </div>
              </div>
              <div className={cx("progressbar-container")}>
                <div className={cx("video-control-container")}>
                  <div className={cx("seek-bar-container")}>
                    <div className={cx("seek-bar-progress")}></div>
                    <div
                      className={cx("seek-bar-circle")}
                      style={{ width: `${progress}%` }}
                    ></div>
                    <div
                      className={cx("seek-bar")}
                      style={{
                        transform: `scaleX(${progress}%) translateY(-50%)`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ActionItem />
        </div>
      </div>
    </div>
  );
}

export default HomeItem;
