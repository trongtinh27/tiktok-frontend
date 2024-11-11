import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Select, { components } from "react-select";
import { Link } from "react-router-dom";
import { NotificationContext } from "~/App";
import { useRef, useState, useContext } from "react";

import {
  UploadCloundIcon,
  VideoIcon,
  ResolutionIcon,
  FrameRateIcon,
  FileIcon,
  CapcutIcon,
  InfoToolkitIcon,
  ImageIcon,
  DropdownIcon,
  Icon16x9Screen,
  Icon9x16Screen,
  Icon1x1Screen,
  VerifyBadge,
  SubituteIcon,
} from "~/components/Icons";
import Button from "~/components/Button";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as videoService from "~/services/videoService";
import { useUser } from "~/contexts/UserContext";
import styles from "./Uploader.module.scss";

// Select Styles

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <DropdownIcon
        style={{
          transition: "transform 0.2s ease",
          transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </components.DropdownIndicator>
  );
};

const selectorStyles = {
  control: (styles) => ({
    ...styles,
    minWidth: "115px",
    height: "44px",
    display: "flex",
    marginRight: "10px",
    justifyContent: "space-between",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.34)",
    borderColor: "transparent",
    fontSize: "16px",
    background: "rgba(255, 255, 255, 0.12)",
    borderRadius: "4px",
    position: "relative",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": { borderColor: "transparent" },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: "0",
    paddingRight: "8px",
    color: "rgba(255, 255, 255, 0.9)",

    "&:hover": { color: "rgba(255, 255, 255, 0.9)" },
  }),
  indicatorSeparator: () => ({
    display: "none", // Ẩn đường phân cách
  }),
  input: (styles) => ({
    ...styles,
    caretColor: "transparent",
  }),
  menu: (styles) => ({
    ...styles,
    width: "120px",
    maxHeight: "320px",
    background: "rgb(18, 18, 18)",
    borderRadius: "4px",
    boxShadow: " rgba(0, 0, 0, 0.12) 0px 2px 12px",
    overflowY: "overlay",

    transition: " display 0.3s",
  }),
  option: (styles) => ({
    ...styles,
    height: "34px",
    overflow: "auto",
    fontSize: "16px",
    padding: "0px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.9)",
    background: "unset",
    "&:hover, &:focus": { background: "rgba(255, 255, 255, 0.04)" },
  }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles) => ({
    ...styles,
    color: "rgba(255, 255, 255, 0.9)",
  }),
};

const frameRateOptions = [
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>16:9</span>
        <Icon16x9Screen />
      </div>
    ),
    value: "vertical",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>9:16</span>
        <Icon9x16Screen />
      </div>
    ),
    value: "horizontal",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>1:1</span>
        <Icon1x1Screen />
      </div>
    ),
    value: "square",
  },
];

const cx = classNames.bind(styles);
function Uploader() {
  // Axios
  const axiosInstance = useAxiosWithInterceptor();

  // UserContext
  const { user } = useUser();

  // Notification
  const notify = useContext(NotificationContext);

  const [file, setFile] = useState();
  const [duration, setDuration] = useState(null);
  const [posterFile, setPosterFile] = useState();
  const [posterUrl, setPosterUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [inputDecription, setInputDecription] = useState("");
  const fileInputRef = useRef();
  const posterInputRef = useRef();
  const [frameRate, setFrameRate] = useState(frameRateOptions[0]);

  const MAX_SIZE = 10 * 1024 * 1024; // 10 GB in bytes
  const MAX_DURATION = 60 * 10; // 60 minutes in seconds

  const formatFileSize = (size) => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes} phút ${seconds} giây`;
  };

  const handleChangeInput = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleFrameRateChange = (selectedOption) =>
    setFrameRate(selectedOption);

  const handlePosterClick = () => {
    posterInputRef.current.click();
  };

  const handlePosterChange = (event) => {
    const posterFile = event.target.files[0];
    setPosterFile(posterFile);

    // Tạo URL cho file ảnh và lưu vào state
    const imageUrl = URL.createObjectURL(posterFile);
    setPosterUrl(imageUrl);

    // Giải phóng bộ nhớ URL cũ nếu có
    if (posterUrl) {
      URL.revokeObjectURL(posterUrl);
    }
  };

  const handleSelectVideo = () => {
    fileInputRef.current.click();
  };

  const handleChangeVideo = (event) => {
    const selectedFile = event.target.files[0];

    // Kiểm tra dung lượng file
    if (selectedFile.size > MAX_SIZE) {
      setErrorMessage("Dung lượng file vượt quá 10GB.");
      return;
    }

    setFile(selectedFile);
    setInputDecription(selectedFile.name);
    setErrorMessage("");

    const videoUrl = URL.createObjectURL(selectedFile);
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;

    videoElement.onloadedmetadata = () => {
      const videoDuration = videoElement.duration;

      // Kiểm tra thời lượng video
      if (videoDuration > MAX_DURATION) {
        setErrorMessage("Thời lượng video vượt quá 60 phút.");
        setFile(null);
        URL.revokeObjectURL(videoUrl);
        return;
      }

      setDuration(videoDuration);
      // Lấy hình nền mặc định
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext("2d");

      // Khi video đã sẵn sàng, vẽ khung hình đầu tiên lên canvas
      videoElement.currentTime = 0;
      videoElement.onseeked = () => {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Lấy Blob từ canvas
        canvas.toBlob((blob) => {
          if (blob) {
            // Tạo File từ Blob và gắn vào posterFile
            const posterFile = new File([blob], "poster.png", {
              type: "image/png",
            });
            setPosterFile(posterFile);
          }
        }, "image/png");

        // Lấy URL của hình nền từ canvas và lưu vào posterUrl
        const posterUrl = canvas.toDataURL("image/png");
        setPosterUrl(posterUrl);

        // Giải phóng URL video khi không cần nữa
        URL.revokeObjectURL(videoUrl);
      };
    };
  };

  // Xử lý khi file được kéo vào div
  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.34)"; // Thay đổi màu viền khi kéo vào
  };

  const handleDragLeave = (event) => {
    event.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)"; // Trả về màu ban đầu khi kéo ra ngoài
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)"; // Trả về màu ban đầu khi thả file
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      handleChangeVideo({ target: { files: [selectedFile] } });
    }
  };

  // Xử lý hủy bỏ
  const handleCancel = () => {
    setFile();
    setDuration();
    setErrorMessage();
    setFrameRate();
    setPosterFile();
    setPosterUrl();
    setInputDecription("");
  };
  const handleUploadVideo = async () => {
    // Tạo đối tượng request ban đầu
    const uploadVideoRequest = {
      userId: user.id,
      videoUrl: "",
      thumbnailUrl: "",
      description: inputDecription,
      shape: frameRate.value,
    };

    // Tối ưu hóa quá trình upload file
    const uploadFile = async (file, uploadPreset, uploadUrl) => {
      if (!file) return null; // Nếu không có file thì trả về null
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          return data.url; // Trả về URL sau khi upload thành công
        } else {
          console.error("Upload failed:", res.statusText);
          return null;
        }
      } catch (error) {
        console.error("An error occurred while uploading:", error);
        return null;
      }
    };

    // Đặt trạng thái loading và vô hiệu nút bấm
    setLoading(true);
    setDisableBtn(true);

    try {
      // Sử dụng Promise.all để upload video và poster cùng lúc
      const [videoUrl, thumbnailUrl] = await Promise.all([
        uploadFile(
          file,
          "wcjgqsww",
          "https://api.cloudinary.com/v1_1/dsnt37ad4/video/upload"
        ),
        uploadFile(
          posterFile,
          "wcjgqsww",
          "https://api.cloudinary.com/v1_1/dsnt37ad4/image/upload"
        ),
      ]);

      // Cập nhật URL video và poster vào request
      if (videoUrl) uploadVideoRequest.videoUrl = videoUrl;
      if (thumbnailUrl) uploadVideoRequest.thumbnailUrl = thumbnailUrl;

      // Upload video thông qua videoService
      const res = await videoService.uploadVideo(
        axiosInstance,
        uploadVideoRequest
      );

      if (res.status === 200) {
        // Thành công: Cập nhật trạng thái và thông báo
        setLoading(false);
        setDisableBtn(false);
        handleCancel();
        notify("", "Đăng video thành công", "info");
        console.log(res.data);
      } else {
        // Nếu response không thành công
        notify("", "Đã xảy ra lỗi", "danger");
        console.log(res);
      }
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
      notify("", "Đã xảy ra lỗi", "danger");
      setLoading(false);
      setDisableBtn(false);
    }
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("wrapper")}>
          {!file ? (
            <div className={cx("main-content")}>
              <div className={cx("content")}>
                <input
                  type="file"
                  onChange={handleChangeVideo}
                  accept="video/*"
                  ref={fileInputRef}
                  className={cx("input")}
                />
                <div
                  role="button"
                  onClick={handleSelectVideo}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cx("select-video-container")}
                >
                  <div className={cx("stage-container")}>
                    <div className={cx("cart-icon")}>
                      <UploadCloundIcon className={cx("icon")} />
                    </div>
                    <div className={cx("instructions")}>
                      <p className={cx("title-instruction")}>
                        Chọn video để tải lên
                      </p>
                      <p className={cx("content-instruction")}>
                        Hoặc kéo thả vào đây
                      </p>
                      <Button className={cx("stage-button")} primary>
                        Chọn video
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("video-suggestion")}>
                <div className={cx("items")}>
                  <div className={cx("item-icon")}>
                    <VideoIcon className={cx("svg")} />
                  </div>
                  <div className={cx("text")}>
                    <p className={cx("title")}>Dung lượng và thời lượng</p>
                    <p className={cx("text-content")}>
                      {/* Dung lượng tối đa: 10 GB, thời lượng video: 60 phút. */}
                      {`Dung lượng tối đa: ${formatFileSize(
                        MAX_SIZE
                      )}, thời lượng video: ${formatDuration(MAX_DURATION)}.`}
                    </p>
                  </div>
                </div>
                <div className={cx("items")}>
                  <div className={cx("item-icon")}>
                    <FileIcon className={cx("svg")} />
                  </div>
                  <div className={cx("text")}>
                    <p className={cx("title")}>Định dạng tập tin</p>
                    <p className={cx("text-content")}>
                      Đề xuất: “.mp4”. Có hỗ trợ các định dạng chính khác.
                    </p>
                  </div>
                </div>
                <div className={cx("items")}>
                  <div className={cx("item-icon")}>
                    <ResolutionIcon className={cx("svg")} />
                  </div>
                  <div className={cx("text")}>
                    <p className={cx("title")}>Độ phân giải video</p>
                    <p className={cx("text-content")}>
                      Độ phân giải tối thiểu: 720p. Có hỗ trợ 2K và 4K.
                    </p>
                  </div>
                </div>
                <div className={cx("items")}>
                  <div className={cx("item-icon")}>
                    <FrameRateIcon className={cx("svg")} />
                  </div>
                  <div className={cx("text")}>
                    <p className={cx("title")}>Tỷ lệ khung hình</p>
                    <p className={cx("text-content")}>
                      Đề xuất: 16:9 cho chế độ ngang, 9:16 cho chế độ dọc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={cx("info-panel-container")}>
              <div className={cx("info-body")}>
                <div className={cx("info-title")}>
                  <span className={cx("info-title-text")}>{file?.name}</span>
                </div>
                <div className={cx("info-detail")}>
                  <span className={cx("info-detail-item")}>
                    <span className={cx("item-label")}>Dung lượng</span>
                    <span className={cx("item-value")}>
                      {formatFileSize(file?.size)}
                    </span>
                  </span>
                  <span className={cx("info-detail-item")}>
                    <span className={cx("item-label")}>Thời lượng</span>
                    <span className={cx("item-value")}>
                      {formatDuration(duration)}
                    </span>
                  </span>
                </div>
                <div className={cx("info-status")}>
                  <div className={cx("info-status-item")}>
                    <VerifyBadge />
                    <span className={cx("info-status-text")}>Đã tải lên</span>
                  </div>
                </div>
              </div>
              <div className={cx("info-op-container")}>
                <Button
                  disabled={disableBtn}
                  onClick={handleCancel}
                  className={cx("info-op-btn")}
                >
                  <div className={cx("btn-content")}>
                    <SubituteIcon />
                    Thay Thế
                  </div>
                </Button>
              </div>
              <div className={cx("info-status-container")} width="100%">
                <div className={cx("info-progress-num")}>100%</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={cx("center-content")}>
        <div className={cx("center-container")}>
          <div className={cx("caption-container")}>
            <div className={cx("caption-title")}>
              <span className={cx("text-title")}>Mô tả</span>
            </div>
            <div className={cx("caption-markup")}>
              <textarea
                maxLength={4000}
                placeholder="Chia sẻ thêm về video của bạn tại đây..."
                className={cx("edit-caption")}
                value={inputDecription}
                onChange={handleChangeInput(setInputDecription)}
              ></textarea>
              <div className={cx("caption-toolkit")}>
                <div className={cx("word-count")}>
                  <p>0/4000</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("cover-container")}>
            <input
              type="file"
              ref={posterInputRef}
              onChange={handlePosterChange}
              tabIndex="-1"
              accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
              className={cx("poster-upload")}
            />
            <span className={cx("cover-title")}>
              Ảnh bìa
              <Tippy
                delay={[0, 200]}
                content="Chọn hoặc tải ảnh bìa lên từ thiết bị của bạn. Ảnh bìa đẹp có thể thu hút sự quan tâm của người xem một cách hiệu quả."
                placement="right"
              >
                <div role="button" className={cx("title-toolkit")}>
                  <InfoToolkitIcon />
                </div>
              </Tippy>
            </span>
            <div onClick={handlePosterClick} className={cx("cover-content")}>
              <input
                className={cx("input-cover")}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
              />
              {posterUrl ? (
                <div className={cx("poster-cover-cantainer")}>
                  <img
                    alt=""
                    src={posterUrl}
                    className={cx("poster-img")}
                  ></img>
                </div>
              ) : (
                <div className={cx("cover-info-toolkit")}>
                  <ImageIcon />
                </div>
              )}

              <div className={cx("cover-edit")}>Sửa ảnh bìa</div>
            </div>
          </div>
          <div className={cx("frame-container")}>
            <span className={cx("frame-title")}>
              Tỉ lệ khung hình
              <Tippy
                delay={[0, 200]}
                content="Đề xuất: 16:9 cho chế độ ngang, 9:16 cho chế độ dọc."
                placement="right"
              >
                <div role="button" className={cx("title-toolkit")}>
                  <InfoToolkitIcon />
                </div>
              </Tippy>
            </span>
            <div className={cx("frame-select")}>
              <Select
                components={{ DropdownIndicator }}
                styles={selectorStyles}
                placeholder="Tỉ lệ khung hình"
                options={frameRateOptions}
                onChange={handleFrameRateChange}
                value={frameRate}
              />
            </div>
          </div>
          <div className={cx("form-divider")}>
            <div className={cx("line")}></div>
          </div>
          <div className={cx("button-group")}>
            <Button
              disabled={disableBtn}
              loading={loading}
              onClick={handleUploadVideo}
              className={cx("btn", "primary")}
              primary
            >
              Đăng
            </Button>
            <Button
              disabled={disableBtn}
              onClick={handleCancel}
              className={cx("btn", "secondary")}
            >
              Hủy bỏ
            </Button>
          </div>
        </div>
      </div>
      <div className={cx("footer-content")}>
        <div className={cx("content")}>
          <p className={cx("content-title")}>
            Tạo video chất lượng cao trên CapCut Online
          </p>
          <p className={cx("content-text")}>
            Tự động cắt ngắn video của bạn và tạo video từ kịch bản với các tính
            năng hoạt động bằng AI.
          </p>
        </div>
        <Link to="https://www.capcut.com/vi-vn/" className={cx("footer-btn")}>
          <div className={cx("btn-content")}>
            <CapcutIcon />
            <p className={cx("btn-label")}>Thử ngay</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Uploader;
