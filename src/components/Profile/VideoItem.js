import classNames from "classnames/bind";
import { useRef, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PlayIcon } from "~/components/Icons";
import images from "~/assets/images";
import styles from "./User.module.scss";

const cx = classNames.bind(styles);

function VideoItem() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const drawVideoOnCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    if (video && canvas && ctx) {
      const draw = () => {
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        if (isHovered) {
          requestAnimationFrame(draw);
        }
      };
      draw();
    }
  }, [isHovered]);

  useEffect(() => {
    const video = videoRef.current;

    if (isHovered) {
      video.muted = true;
      video.play().catch((error) => {});
      drawVideoOnCanvas();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered, drawVideoOnCanvas]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={cx("video-item-wrapper")}
      role="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cx("video-item-container")}>
        <div className={cx("video-item-content")}>
          <div className={cx("wrapper")}>
            <Link to="" className={cx("media-card")}>
              <canvas ref={canvasRef} className={cx("canvas")} />
              <div className={cx("video-player")}>
                <div className={cx("basic-media")}>
                  <div className={cx("web-media")}>
                    <video
                      ref={videoRef}
                      crossOrigin="anonymous"
                      loop
                      playsInline
                      preload="auto"
                      muted={true}
                      src={images.videoTest}
                    />
                  </div>
                </div>
                <div className={cx("card-footer")}>
                  <PlayIcon />
                  <strong>3008</strong>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className={cx("video-item-description")}>
        <div className={cx("description")}>
          <span>description test</span>
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
