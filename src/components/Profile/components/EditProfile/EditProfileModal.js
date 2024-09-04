import classNames from "classnames/bind";
import { useState, useRef } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import Image from "~/components/Image";
import Button from "~/components/Button";
import { CloseIcon, PenIcon, CheckBoldIcon } from "~/components/Icons";
import styles from "./EditProfileModal.module.scss";

const cx = classNames.bind(styles);

function EditProfileModal({ isOpen, onClose }) {
  // State
  //   const [isOpen, setIsOpen] = useState(true);
  const [isError, setIsError] = useState(false);

  //   Ref
  const inputRef = useRef(null);

  const handleClickUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="Overlay"
      ariaHideApp={false}
      className={cx("wrapper")}
    >
      <div className={cx("mark")}></div>
      <div className={cx("content")}>
        <div className={cx("container")}>
          <div className={cx("center")}>
            <section className={cx("edit-profile")}>
              <div className={cx("popup")}>
                <div className={cx("header-container")}>
                  <h1 className={cx("title")}>Sửa hồ sơ</h1>
                  <div
                    onClick={onClose}
                    role="button"
                    className={cx("close-container")}
                  >
                    <CloseIcon />
                  </div>
                </div>
                <div className={cx("content-container")}>
                  <div className={cx("content-item")}>
                    <div className={cx("item-title")}>Ảnh hồ sơ</div>
                    <div
                      role="button"
                      className={cx("item-avatar")}
                      onClick={handleClickUpload}
                    >
                      <div className={cx("avatar-container")}>
                        <Image
                          src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/579e8895677e86683abb0f2a1583a44e.jpeg?lk3s=a5d48078&nonce=30308&refresh_token=aa9f91de81dd84e780a6ed964db65711&x-expires=1724983200&x-signature=ltti%2FyPtuC01J6vtuSRmbjeP7To%3D&shp=a5d48078&shcp=81f88b70"
                          className={cx("avatar")}
                        />
                      </div>
                      <div
                        role="button"
                        className={cx("edit-avatar-container")}
                      >
                        <PenIcon className={cx("edit-icon")} />
                        <input
                          type="file"
                          ref={inputRef}
                          tabIndex="-1"
                          accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                          className={cx("input-upload")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("content-item")}>
                    <div className={cx("item-title")}>TikTok ID</div>
                    <div className={cx("edit-container")}>
                      <input
                        className={cx("input-text", isError && "error")}
                        type="text"
                        placeholder="TikTok ID"
                        value="letrtinh"
                        maxLength={24}
                      />
                      {isError ? (
                        <p className={cx("error-message")}>
                          Không thể sử dụng TikTok ID này. Vui lòng nhập TikTok
                          ID mới.
                        </p>
                      ) : (
                        <CheckBoldIcon className={cx("tick")} />
                      )}
                      <p className={cx("link")}>www.tiktok.com/@letrtinh</p>
                      <p className={cx("tip")}>
                        TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch
                        dưới và dấu chấm. Khi thay đổi TikTok ID, liên kết hồ sơ
                        của bạn cũng sẽ thay đổi.
                      </p>
                    </div>
                  </div>
                  <div className={cx("content-item")}>
                    <div className={cx("item-title")}>Tên</div>
                    <div className={cx("edit-container")}>
                      <input
                        className={cx("input-text")}
                        type="text"
                        placeholder="Tên"
                        value="Lê Trọng Tình"
                      />
                      <p className={cx("tip")}>
                        Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.
                      </p>
                    </div>
                  </div>
                  <div className={cx("content-item", "bio")}>
                    <div className={cx("item-title")}>Tiểu sử</div>
                    <div className={cx("edit-container")}>
                      <textarea
                        placeholder="Tiểu sử"
                        minLength={0}
                        maxLength={80}
                        className={cx("textarea-bio")}
                      ></textarea>
                      <div className={cx("text-count")}>
                        <span>0</span>
                        /80
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className={cx("footer-container")}>
                  <Button onClick={onClose} className={cx("btn-cancel")}>
                    Hủy
                  </Button>
                  <Button primary disabled className={cx("btn-save")}>
                    Lưu
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Modal>
  );
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditProfileModal;
