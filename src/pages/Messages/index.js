import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import { useUser } from "~/contexts/UserContext";
import * as userService from "~/services/userService";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import ChatBox from "~/components/ChatBox";
import MessageItem from "~/components/MessageItem";
import { BackV2Icon, SettingIcon } from "~/components/Icons";
import Button from "~/components/Button";
import styles from "./Messages.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Messages() {
  const axiosInstance = useAxiosWithInterceptor();
  const [messages, setMessages] = useState([]);
  const stompClientRef = useRef(null);
  const [roomId, setRoomId] = useState(0);
  const [receiverId, setReceiverId] = useState();
  const [listFriend, setListFriend] = useState([]);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();

  const onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const connect = () => {
    var socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, onConnected, onError);

    stompClientRef.current = client; // Lưu giá trị stompClient vào ref
    // console.log("Stomp Client Connected:", stompClientRef.current.connected);
  };

  const disconnect = () => {
    if (stompClientRef.current) {
      stompClientRef.current.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
      stompClientRef.current = null;
    }
  };

  const onConnected = () => {
    // Subscribe to the Public Topic
    // console.log(`Subscribed to /queue/messages/${roomId}`);
    if (roomId) {
      stompClientRef.current.subscribe(
        `/queue/messages/${roomId}`, // Đăng ký tới phòng dựa trên roomId
        onMessageReceived
      );
    }
  };

  const onError = (error) => {
    console.error("Could not connect to WebSocket! " + error);
  };

  useEffect(() => {
    const getListFriend = async () => {
      try {
        const fetchApi = await userService.listFriendApi(
          axiosInstance,
          user.id
        );
        if (fetchApi.status === 200) {
          setListFriend(fetchApi.data);
        } else {
          setListFriend([]);
        }
      } catch (error) {}
    };
    if (isLoggedIn) {
      getListFriend();
    } else {
      navigate("/"); // Điều hướng đến trang 404 nếu username không hợp lệ
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (roomId) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [roomId]);

  return (
    <div className={cx("main-content-messages")}>
      <div className={cx("conversation-list-container")}>
        <Button className={cx("back-btn")}>
          <BackV2Icon className={cx("back-icon")} />
        </Button>
        <div className={cx("conversation-header")}>
          <h1 className={cx("header-title")}>Tin nhắn</h1>
          <div role="button" className={cx("messages-setting")}>
            <SettingIcon />
          </div>
        </div>
        <div className={cx("conversation-list")}>
          <div className={cx("scroll-container")}>
            <div className={cx("scroll-wrapper")}>
              {listFriend.map((friend) => (
                <MessageItem
                  key={friend.id}
                  data={friend}
                  disconnect={disconnect}
                  connect={connect}
                  onConnected={onConnected}
                  axiosInstance={axiosInstance}
                  user={user}
                  setRoomId={setRoomId}
                  setReceiverId={setReceiverId}
                ></MessageItem>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={cx("chat-box")}>
        <ChatBox
          messages={messages}
          stompClientRef={stompClientRef}
          connect={connect}
          receiverId={receiverId}
          onMessageReceived={onMessageReceived}
          roomId={roomId}
          setMessages={setMessages}
          axiosInstance={axiosInstance}
        />
      </div>
    </div>
  );
}

export default Messages;
