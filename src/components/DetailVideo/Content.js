import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import { EmojiIcon } from "~/components/Icons";
import useCheckLogin from "~/hooks/useCheckLogin";
import * as videoService from "~/services/videoService";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import { VideoItem } from "~/components/Profile";
import Emoji from "~/components/Emoji";
import VideoAction from "./VideoAction";
import images from "~/assets/images";
import { MusicIcon } from "~/components/Icons";
import Image from "~/components/Image";
import Button from "~/components/Button";
import CommentItem from "./CommentItem";
import styled from "./Content.module.scss";
import { useUser } from "~/contexts/UserContext";
import * as followService from "~/services/followService";
import * as commentService from "~/services/commentService";

const cx = classNames.bind(styled);

let stompClient = null;

function Content({ username, video }) {
  const axiosInstance = useAxiosWithInterceptor();
  const { user } = useUser();
  const checkLogin = useCheckLogin();

  const [tabMenu, setTabMenu] = useState(true);
  // CommentBox
  const [visibleListEmoji, setVisibleListEmoji] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef();

  const handleChangeTab = (e) => {
    setTabMenu(e);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setMessageInput(value);
    }
  };

  const handleEmoji = () => {
    setVisibleListEmoji(!visibleListEmoji);
  };

  const handleEmojiClick = (emoji) => {
    const input = inputRef.current;

    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      const newMessage =
        messageInput.substring(0, start) + emoji + messageInput.substring(end);

      setMessageInput(newMessage);

      setTimeout(() => {
        input.setSelectionRange(start + emoji.length, start + emoji.length);
        input.focus(); // Đưa con trỏ trở lại input
      }, 0);
    }
  };

  const loadVideo = async (username) => {
    try {
      const res = await videoService.getVideoByUser(axiosInstance, username);
      if (res.status === 200) {
        setVideoList(res.data);
      }
    } catch (error) {
      console.error("Error loading videos:", error);
    }
  };

  const handleCheckFollow = async (userId, videoUserID) => {
    const resFollow = await followService.checkFollowApi(
      axiosInstance,
      videoUserID,
      userId
    );

    if (resFollow.status === 200) {
      const checkFollow = resFollow.data;

      if (checkFollow.following) {
        setFollowStatus(true);
      } else {
        setFollowStatus(false);
      }
    }
  };

  const handleClickFollow = () => {
    checkLogin(async () => {
      const followRequest = {
        followerId: video?.userId,
        followedId: user.id,
      };
      const callToggleFollowApi = await followService.toggleFollow(
        axiosInstance,
        followRequest
      );

      if (callToggleFollowApi.status === 200) {
        setFollowStatus(callToggleFollowApi.data.following ? true : false);
      }
    });
  };

  const getComments = async () => {
    try {
      const res = await commentService.getComments(axiosInstance, video?.id);
      console.log("res", res);

      if (res.status === 200) {
        setComments(res.data);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  useEffect(() => {
    if (username) {
      loadVideo(username);
    }
    if (video?.id) {
      getComments();
    }
    if (
      user?.id &&
      user !== undefined &&
      video?.userId &&
      video !== undefined
    ) {
      handleCheckFollow(user?.id, video?.userId);
    }
  }, [video, username, user, followStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (video) {
      const socket = new SockJS("http://localhost:8080/ws"); // Đổi URL nếu cần
      stompClient = Stomp.over(socket);
      stompClient.connect({}, onConnected, onError);

      return () => {
        if (stompClient) {
          stompClient.disconnect();
        }
      };
    }
  }, [video]); // eslint-disable-line react-hooks/exhaustive-deps

  const onMessageReceived = (message) => {
    const newComment = JSON.parse(message.body);
    setComments((prev) => [...prev, newComment]);
    setCommentCount((prev) => prev + 1);
  };

  const onConnected = () => {
    // Subscribe để nhận bình luận theo videoId
    stompClient.subscribe(`/topic/comments/${video?.id}`, onMessageReceived);
  };

  const onError = (error) => {
    console.error("WebSocket error:", error);
  };

  const send = () => {
    checkLogin(async () => {
      if (messageInput) {
        const newComment = {
          videoId: video?.id,
          userId: user?.id,
          content: messageInput,
        };

        try {
          await axiosInstance.post(
            "http://localhost:8080/comments/post",
            newComment
          );

          // Gửi bình luận qua WebSocket ngay lập tức
          if (stompClient && stompClient.connected) {
            stompClient.send(
              `/app/comments/${video?.id}`,
              {},
              JSON.stringify(newComment)
            );
          }

          setMessageInput(""); // Xóa input sau khi gửi
        } catch (error) {
          console.error("Lỗi gửi comment:", error);
        }
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Ngăn chặn xuống dòng trong input
      send(); // Gọi hàm gửi bình luận
    }
  };

  return (
    <>
      <div className={cx("comment-container")}>
        <div className={cx("list-container")}>
          <div className={cx("profile-wrapper")}>
            <div className={cx("profile")}>
              <div className={cx("info")}>
                <Link to={"/@" + video?.username} className={cx("avt-link")}>
                  <div className={cx("avt-container")}>
                    <span className={cx("avatar")}>
                      <Image
                        className={cx("img-avt")}
                        src={video?.userAvatar}
                        fallback="https://via.placeholder.com/56x100"
                      />
                    </span>
                  </div>
                </Link>
                <Link
                  to={"/@" + video?.username}
                  className={cx("username-link")}
                >
                  <span className={cx("username-container")}>
                    <span className={cx("username-content")}>
                      {video?.username}
                    </span>
                  </span>
                  <br />
                  <span className={cx("displayName-container")}>
                    <span className={cx("displayName-content")}>
                      {video?.displayName}
                    </span>
                  </span>
                </Link>
                <div className={cx("btn-wrapper")}>
                  {video?.userId !== user?.id &&
                    (followStatus ? (
                      <Button
                        onClick={handleClickFollow}
                        className={cx("btn-unfollow")}
                      >
                        Hủy Follow
                      </Button>
                    ) : (
                      <Button
                        onClick={handleClickFollow}
                        className={cx("btn-follow")}
                        primary
                      >
                        Follow
                      </Button>
                    ))}
                </div>
              </div>
              <div className={cx("description")}>
                <div className={cx("wrapper")}>
                  <span className={cx("desc-text")}>{video?.description}</span>
                </div>
                <h4 className={cx("browse-music")}>
                  <Link to="#" className={cx("music-link")}>
                    <MusicIcon className={cx("music-icon")} />
                    <div className={cx("music-text")}>{video?.description}</div>
                  </Link>
                </h4>
                <div className={cx("tag-wrapper")}>
                  <div className={cx("tag")}>
                    <Link
                      to="https://www.capcut.com/editor?scenario=tiktok&utm_campaign=70361230&utm_medium=tiktok_anchor&utm_source=tiktok_anchor_tool"
                      className={cx("tag-link")}
                      target="_blank"
                    >
                      <Image
                        className={cx("tag-icon")}
                        src={images.capcut}
                      ></Image>
                      <p className={cx("tag-text")}>
                        CapCut · Dùng thử một số hiệu ứng mới
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("tab-profile")}>
              <VideoAction
                video={video}
                commentCount={commentCount}
                setCommentCount={setCommentCount}
              ></VideoAction>
            </div>
          </div>
          <div className={cx("menu-wrapper")}>
            <div className={cx("tab-menu")}>
              <div
                onClick={() => handleChangeTab(true)}
                className={cx("menu-item", {
                  active: tabMenu, // Nếu tabMenu là true, thì sẽ thêm class 'active'
                })}
              >
                <div
                  className={cx("tab-item")}
                >{`Bình luận ${commentCount}`}</div>
              </div>
              <div
                onClick={() => handleChangeTab(false)}
                className={cx("menu-item", {
                  active: !tabMenu, // Nếu tabMenu là true, thì sẽ thêm class 'active'
                })}
              >
                <div className={cx("tab-item")}>Video của nhà sáng tạo</div>
              </div>
            </div>
            <div className={cx("bottom-border")}></div>
          </div>
          <div className={cx("back-btn")}></div>
          {tabMenu ? (
            comments.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ))
          ) : (
            <>
              {/* <h1>Video của nhà sáng tạo</h1> */}
              <div className={cx("videos-wrapper")}>
                <div className={cx("videos-container")}>
                  <div className={cx("videos")}>
                    {videoList?.map((video) => (
                      <VideoItem
                        className={cx("video-item")}
                        key={video.id}
                        videoData={video}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div onKeyDown={handleKeyDown} className={cx("comment-btn-container")}>
        <div className={cx("input-container")}>
          <input
            type="text"
            value={messageInput}
            className={cx("comment-input")}
            placeholder="Gửi tin nhắn..."
            ref={inputRef}
            onChange={handleChange}
          />
          <div role="button" className={cx("emoji-wrapper")}>
            <Tippy
              delay={[0, 200]}
              content="Nhấn để thêm Emoji"
              placement="top"
            >
              <EmojiIcon onClick={handleEmoji} />
            </Tippy>
            {visibleListEmoji && ( // Render Emoji only if visibleListEmoji is true
              <Emoji
                handleEmojiClick={handleEmojiClick}
                visible={visibleListEmoji}
                handleEmoji={handleEmoji}
              />
            )}
          </div>
        </div>
        <div
          role="button"
          tabIndex="0"
          className={cx("submit-btn", {
            disable: messageInput === "",
          })}
          onClick={send}
        >
          Đăng
        </div>
      </div>
    </>
  );
}

export default Content;
