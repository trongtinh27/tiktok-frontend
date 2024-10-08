import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { NotificationContext } from "~/App";

import { useUser } from "~/contexts/UserContext";
import { useDebounce } from "~/hooks";
import * as userService from "~/services/userService";
import Image from "~/components/Image";
import Button from "~/components/Button";
import {
  CloseIcon,
  PenIcon,
  CheckBoldIcon,
  LoadingIcon,
} from "~/components/Icons";
import styles from "./EditProfileModal.module.scss";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";

const cx = classNames.bind(styles);

function EditProfileModal({ isOpen, onClose }) {
  const axiosInstance = useAxiosWithInterceptor();
  // UserContext
  const { user, updateUser } = useUser();

  // State
  const [inputAvatar, setInputAvatar] = useState();
  const [inputTikTokID, setInputTikTokID] = useState();
  const [inputFullName, setInputFullName] = useState();
  const [inputBio, setInputBio] = useState();

  const [loading, setLoading] = useState(false);
  const [bntLoading, setBtnLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [isError, setIsError] = useState(false);

  // Notification
  const notify = useContext(NotificationContext);

  //   Ref
  const inputRef = useRef(null);

  const handleClickUpload = async (mediaType) => {
    if (inputRef.current) {
      inputRef.current.click(); // Mở file picker
      inputRef.current.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "wcjgqsww");

          try {
            const res = await fetch(
              `https://api.cloudinary.com/v1_1/dsnt37ad4/${mediaType}/upload`,
              {
                method: "POST",
                body: formData,
              }
            );

            if (res.ok) {
              const data = await res.json();
              setInputAvatar(data.secure_url); // Lưu lại public_id của ảnh/video vừa upload
              console.log(data);
            } else {
              console.error("Upload failed", res.statusText);
            }
          } catch (error) {
            console.error("An error occurred while uploading:", error);
          }
        }
      };
    }
  };

  const handleChangeInput = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleEditProfile = async () => {
    const editProfileForm = {
      id: user.id,
      avatarURL: inputAvatar,
      username: inputTikTokID,
      fullName: inputFullName,
      bio: inputBio,
    };

    try {
      setBtnLoading(true);

      const res = await userService.editProfileApi(
        axiosInstance,
        editProfileForm
      );
      if (res.status === 200) {
        notify("", "Cập nhật thông tin thành công", "info");
        onClose();
        updateUser(res.data);
      }
    } catch (error) {
      notify("", "Cập nhật thông tin thất bại", "danger");
    } finally {
      setBtnLoading(false);
    }
  };

  // Debounce
  const debounce = useDebounce(inputTikTokID, 600);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);

      const res = await userService.checkUsernameApi(axiosInstance, debounce);
      const usernameValidate = res.data;
      if (usernameValidate?.exists) {
        setIsError(true);
      } else {
        setIsError(false);
      }
      if (user?.username === debounce) {
        setIsError(false);
      }

      setLoading(false);
    };

    fetchApi();
  }, [debounce, user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user !== null && user !== undefined) {
      setInputAvatar(user.avatarURL);
      setInputTikTokID(user.username);
      setInputFullName(user.fullName);
      setInputBio(user.bio);
    }
  }, [user]);

  useEffect(() => {
    if (
      (user?.avatarURL !== inputAvatar ||
        user?.username !== inputTikTokID ||
        user?.fullName !== inputFullName ||
        user?.bio !== inputBio) &&
      !isError
    ) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [user, inputAvatar, inputTikTokID, inputFullName, inputBio, isError]);

  return (
    <>
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
                        className={cx("item-avatar")}
                        onClick={() => handleClickUpload("image")}
                      >
                        <div role="button" className={cx("avatar-container")}>
                          <Image src={inputAvatar} className={cx("avatar")} />
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
                          defaultValue={inputTikTokID}
                          onChange={handleChangeInput(setInputTikTokID)}
                          maxLength={24}
                        />
                        {isError ? (
                          <p className={cx("error-message")}>
                            Không thể sử dụng TikTok ID này. Vui lòng nhập
                            TikTok ID mới.
                          </p>
                        ) : (
                          <CheckBoldIcon className={cx("tick")} />
                        )}

                        {loading && <LoadingIcon className={cx("loading")} />}
                        <p className={cx("link")}>
                          www.tiktok.com/@{inputTikTokID}
                        </p>
                        <p className={cx("tip")}>
                          TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch
                          dưới và dấu chấm. Khi thay đổi TikTok ID, liên kết hồ
                          sơ của bạn cũng sẽ thay đổi.
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
                          defaultValue={inputFullName}
                          onChange={handleChangeInput(setInputFullName)}
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
                          defaultValue={inputBio}
                          onChange={handleChangeInput(setInputBio)}
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
                    <Button
                      primary
                      loading={bntLoading}
                      disabled={btnDisable}
                      className={cx("btn-save")}
                      onClick={handleEditProfile}
                    >
                      Lưu
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditProfileModal;
