import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

import * as followService from "~/services/followService";
import UserItem from "../UserItem";
import { CloseIcon } from "~/components/Icons";
import styles from "./FollowModal.module.scss";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";

const cx = classNames.bind(styles);
function FollowModal({ userInfo, tab, isOpen, onClose }) {
  const axiosInstance = useAxiosWithInterceptor();
  const [tabState, setTabState] = useState(tab);
  const [listFollow, setListFollow] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  // Cookies
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const handleChangeTab = (tabTitle) => {
    setTabState(tabTitle);
    setOffset(0); // Reset offset khi chuyển tab
    setListFollow([]); // Reset lại danh sách
    setHasMore(true); // Cho phép tải thêm dữ liệu khi chuyển tab
  };

  useEffect(() => {
    if (isOpen) {
      if (tabState === "following") {
        setListFollow([]); // Reset lại danh sách
        const getListFollowing = async () => {
          try {
            const res = await followService.getListFollowingApi(
              axiosInstance,
              userInfo?.id,
              offset,
              limit
            );
            if (res.status === 200) {
              setListFollow((prev) => {
                if (prev.length === 0) {
                  return res.data;
                } else {
                  return [...prev, ...res.data];
                }
              });
              if (res.data.length < limit) {
                setHasMore(false); // Nếu dữ liệu trả về ít hơn limit, không còn dữ liệu nữa
              }
            }
          } catch (error) {
            console.log(error);
          }
        };

        getListFollowing();
      }
      if (tabState === "follower") {
        setListFollow([]); // Reset lại danh sách
        const getListFollowing = async () => {
          try {
            const res = await followService.getListFollowerApi(
              axiosInstance,
              userInfo?.id,
              offset,
              limit
            );
            if (res.status === 200) {
              setListFollow((prev) => {
                if (prev.length === 0) {
                  return res.data;
                } else {
                  return [...prev, ...res.data];
                }
              });
              if (res.data.length < limit) {
                setHasMore(false); // Nếu dữ liệu trả về ít hơn limit, không còn dữ liệu nữa
              }
            }
          } catch (error) {
            console.log(error);
          }
        };

        getListFollowing();
      }
    }
  }, [offset, tabState, token, userInfo, isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTabState(tab);
    setOffset(0); // Reset offset khi chuyển tab
    setListFollow([]); // Reset lại danh sách
    setHasMore(true); // Cho phép tải thêm dữ liệu khi chuyển tab
  }, [tab, userInfo]);

  // Hàm kiểm tra người dùng đã cuộn tới cuối danh sách chưa
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    // Nếu người dùng đã cuộn tới cuối và còn dữ liệu thì tải thêm
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore) {
      setOffset((prevOffset) => {
        if (prevOffset === offset) {
          return prevOffset + limit;
        }
        return prevOffset;
      });
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
          <div className={cx("content")}>
            <section className={cx("follow")}>
              <div className={cx("popup")}>
                <div className={cx("header")}>
                  <h1 className={cx("title")}>{userInfo?.username}</h1>
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
                    <strong>{userInfo?.followingCount}</strong>
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
                    <strong>{userInfo?.followerCount}</strong>
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
                <div
                  className={cx("list-user")}
                  onScroll={handleScroll} // Thêm sự kiện onScroll
                >
                  {listFollow?.map((user, index) => (
                    <li key={index}>
                      <UserItem userInfo={user} />
                    </li>
                  ))}
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
