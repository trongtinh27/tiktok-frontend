import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect, useRef, useState } from "react";

import * as chatService from "~/services/chatService";
import { useUser } from "~/contexts/UserContext";
import { ImageIcon, EmojiIcon, MessageActiveIcon } from "~/components/Icons";
import Emoji from "~/components/Emoji";
import ChatItem from "~/components/ChatItem";
import Image from "~/components/Image";
import styles from "./ChatBox.module.scss";

const cx = classNames.bind(styles);

function ChatBox({
  stompClientRef,
  receiverId,
  roomId,
  axiosInstance,
  messages,
  setMessages,
}) {
  const [visibleListEmoji, setVisibleListEmoji] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [chatBox, setChatBox] = useState();
  const inputRef = useRef();
  const { user } = useUser();

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
    if (
      stompClientRef.current &&
      stompClientRef.current.connected &&
      messageInput
    ) {
      var chatMessage = {
        senderId: user.id,
        receiverId: receiverId,
        content: messageInput,
      };
      stompClientRef.current.send(
        `/app/chat.sendMessage/${roomId}`, // Đường dẫn gửi tin nhắn
        {},
        JSON.stringify(chatMessage)
      );
      setMessageInput("");
    }
  };

  useEffect(() => {
    if (axiosInstance && user && receiverId) {
      const getChatBox = async () => {
        const fetch = await chatService.getChatBoxApi(
          axiosInstance,
          user.id,
          receiverId,
          0,
          10
        );

        if (fetch !== undefined && fetch.status === 200) {
          setChatBox(fetch.data);
          setMessages(fetch.data.listMessage);
        }
      };
      getChatBox();
    }
  }, [user, receiverId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {chatBox !== undefined ? (
        <>
          <div className={cx("chat-top")}>
            <div className={cx("content-wrapper")}>
              <Link to={"/@" + chatBox?.receiver.username} target="_blank">
                <span className={cx("avatar-container")}>
                  <Image
                    className={cx("avatar-image")}
                    src={chatBox?.receiver.avatar}
                  />
                </span>
              </Link>
              <Link to="/@admin" target="_blank">
                <div className={cx("name-container")}>
                  <p className={cx("nickname")}>{chatBox?.receiver.fullname}</p>
                  <p className={cx("tiktokid")}>
                    {"@" + chatBox?.receiver.username}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("chat-center")}>
            <div className={cx("container")}>
              {messages?.map((message) => (
                <ChatItem key={message.id} data={message} />
              ))}
            </div>
          </div>
          <div className={cx("chat-bottom")}>
            <div className={cx("chat-input-container")}>
              <input
                type="text"
                value={messageInput}
                className={cx("chat-input")}
                placeholder="Gửi tin nhắn..."
                ref={inputRef}
                onChange={handleChange}
              />
              <div role="button" className={cx("image-wrapper")}>
                <label
                  htmlFor="file-input-select"
                  className={cx("lable-input")}
                >
                  <Tippy
                    delay={[0, 200]}
                    content="Nhấp để gửi tập tin"
                    placement="bottom"
                  >
                    <ImageIcon />
                  </Tippy>
                </label>
                <input
                  id="file-input-select"
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,video/mp4"
                />
              </div>
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
            <div role="button" className={cx("submit-btn")} onClick={send}>
              <MessageActiveIcon onClick={send} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={cx("content-wrapper")}></div>
        </>
      )}
    </>
  );
}

export default ChatBox;
