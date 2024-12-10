import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { ImageIcon, EmojiIcon, MessageActiveIcon } from "~/components/Icons";
import Emoji from "~/components/Emoji";
import VideoAction from "./VideoAction";
import images from "~/assets/images";
import { MusicIcon } from "~/components/Icons";
import Image from "~/components/Image";
import Button from "~/components/Button";
import CommentItem from "./CommentItem";
import styled from "./Content.module.scss";

const cx = classNames.bind(styled);
function Content({ video }) {
  const [tabMenu, setTabMenu] = useState(true);

  // CommentBox
  const [visibleListEmoji, setVisibleListEmoji] = useState(false);
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

  const send = () => {
    if (messageInput) {
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className={cx("comment-container")}>
        <div className={cx("list-container")}>
          <div className={cx("profile-wrapper")}>
            <div className={cx("profile")}>
              <div className={cx("info")}>
                <Link to={"/@admin"} className={cx("avt-link")}>
                  <div className={cx("avt-container")}>
                    <span className={cx("avatar")}>
                      <Image
                        className={cx("img-avt")}
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/048641c5a210f6b662ae2db0e1821667.jpeg?lk3s=a5d48078&nonce=42121&refresh_token=c799674b99b18d443e1029fed9936797&x-expires=1731823200&x-signature=AQppVkkXfxyidF1SvrzN5NGCZ4k%3D&shp=a5d48078&shcp=81f88b70"
                        fallback="https://via.placeholder.com/56x100"
                      />
                    </span>
                  </div>
                </Link>
                <Link to={"/@admin"} className={cx("username-link")}>
                  <span className={cx("username-container")}>
                    <span className={cx("username-content")}>suxinhgai</span>
                  </span>
                  <br />
                  <span className={cx("displayName-container")}>
                    <span className={cx("displayName-content")}>
                      hai một cún
                    </span>
                  </span>
                </Link>
                <div className={cx("btn-wrapper")}>
                  <Button className={cx("btn-follow")} primary>
                    Follow
                  </Button>
                </div>
              </div>
              <div className={cx("description")}>
                <div className={cx("wrapper")}>
                  <span className={cx("desc-text")}>Test description 🥹💗 </span>
                </div>
                <h4 className={cx("browse-music")}>
                  <Link to="#" className={cx("music-link")}>
                    <MusicIcon className={cx("music-icon")} />
                    <div className={cx("music-text")}>
                      2024-03-05 21-24-07.mp4
                    </div>
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
              <VideoAction></VideoAction>
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
                <div className={cx("tab-item")}>Bình luận 14</div>
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
            <>
              <CommentItem />
              <CommentItem />
              <CommentItem />
              <CommentItem />
              <CommentItem />
            </>
          ) : (
            <>
              <h1>Video của nhà sáng tạo</h1>
            </>
          )}
        </div>
      </div>
      <div className={cx("comment-btn-container")}>
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
