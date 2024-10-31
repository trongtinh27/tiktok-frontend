import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Select, { components } from "react-select";

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
import styles from "./Uploader.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    value: "horizontal",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>9:16</span>
        <Icon9x16Screen />
      </div>
    ),
    value: "vertical",
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
  const [file, setFile] = useState(); // eslint-disable-line react-hooks/exhaustive-deps

  const [frameRate, setFrameRate] = useState(frameRateOptions[0]);

  const handleFrameRateChange = (selectedOption) =>
    setFrameRate(selectedOption);
  return (
    <>
      <div className={cx("container")}>
        <div className={cx("wrapper")}>
          {file ? (
            <div className={cx("main-content")}>
              <div role="button" className={cx("content")}>
                <input type="file" accept="video/*" className={cx("input")} />
                <div className={cx("select-video-container")}>
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
                      Dung lượng tối đa: 10 GB, thời lượng video: 60 phút.
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
                  <span className={cx("info-title-text")}>
                    2024-03-05 21-23-32.mp4
                  </span>
                </div>
                <div className={cx("info-detail")}>
                  <span className={cx("info-detail-item")}>
                    <span className={cx("item-label")}>Dung lượng</span>
                    <span className={cx("item-value")}>254.69 KB</span>
                  </span>
                  <span className={cx("info-detail-item")}>
                    <span className={cx("item-label")}>Thời lượng</span>
                    <span className={cx("item-value")}>0 phút 1 giây</span>
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
                <Button className={cx("info-op-btn")}>
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
              ></textarea>
              <div className={cx("caption-toolkit")}>
                <div className={cx("word-count")}>
                  <p>0/4000</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("cover-container")}>
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
            <div className={cx("cover-content")}>
              <input
                className={cx("input-cover")}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
              />
              <div className={cx("cover-info-toolkit")}>
                <ImageIcon />
              </div>
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
            <Button className={cx("btn", "primary")} primary>
              Đăng
            </Button>
            <Button className={cx("btn", "secondary")}>Hủy bỏ</Button>
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
