import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import UserItem from "../UserItem";
import { CloseIcon } from "~/components/Icons";
import styles from "./FollowModal.module.scss";

const cx = classNames.bind(styles);
function FollowModal({ tab, isOpen, onClose }) {
  // State
  const [tabState, setTabState] = useState(tab);

  const handleChangeTab = (tabTitle) => {
    setTabState(tabTitle);
  };

  useEffect(() => {
    setTabState(tab);
  }, [tab]);

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
          <div className={cx("content")}>
            <section className={cx("follow")}>
              <div className={cx("popup")}>
                <div className={cx("header")}>
                  <h1 className={cx("title")}>letrtinh</h1>
                  <div
                    role="button"
                    className={cx("close-container")}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </div>
                </div>
                <div className={cx("tab")}>
                  <div
                    role="button"
                    className={cx(
                      "tab-item",
                      tabState === "following" && "active"
                    )}
                    onClick={() => handleChangeTab("following")}
                  >
                    <div>Đã follow</div>
                    <strong>999</strong>
                  </div>
                  <div
                    role="button"
                    className={cx(
                      "tab-item",
                      tabState === "follower" && "active"
                    )}
                    onClick={() => handleChangeTab("follower")}
                  >
                    <div>Follower</div>
                    <strong>999</strong>
                  </div>
                  <div
                    role="button"
                    className={cx(
                      "tab-item",
                      tabState === "friend" && "active"
                    )}
                    onClick={() => handleChangeTab("friend")}
                  >
                    <div>Bạn bè</div>
                    <strong></strong>
                  </div>
                  <div
                    role="button"
                    className={cx(
                      "tab-item",
                      tabState === "recomment" && "active"
                    )}
                    onClick={() => handleChangeTab("recomment")}
                  >
                    Được đề xuất
                  </div>
                </div>
                <div className={cx("list-user")}>
                  <li>
                    <UserItem />
                  </li>
                  <li>
                    <UserItem />
                  </li>
                  <li>
                    <UserItem />
                  </li>
                  <li>
                    <UserItem />
                  </li>
                  <li>
                    <UserItem />
                  </li>
                  <li>
                    <UserItem />
                  </li>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Modal>
  );
}

FollowModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.any.isRequired,
};

export default FollowModal;
