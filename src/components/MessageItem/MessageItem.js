import classNames from "classnames/bind";

import * as chatService from "~/services/chatService";

import Image from "~/components/Image";
import styles from "./MessageItem.module.scss";

const cx = classNames.bind(styles);
function MessageItem({
  data,
  disconnect,
  connect,
  axiosInstance,
  user,
  setRoomId,
  setReceiverId,
}) {
  const createChatRoom = async () => {
    try {
      // Ngắt kết nối khỏi phòng cũ trước khi chuyển sang phòng mới
      await disconnect();

      const fetchApi = await chatService.createChatRoomApi(
        axiosInstance,
        user.id,
        data?.id
      );

      if (fetchApi.data.status === 200) {
        setRoomId(fetchApi.data.data); // Cập nhật roomId mới

        console.log("room lay được 1: ", fetchApi.data.data);
        connect(); // Kết nối lại WebSocket

        setReceiverId(data?.id);
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <>
      <div className={cx("wrapper")} onClick={createChatRoom}>
        <div className={cx("item")}>
          <div className={cx("avatar-wrapper")}>
            <span className={cx("avatar-container")}>
              <Image className={cx("avatar-image")} src={data?.avatar} />
            </span>

            <div className={cx("avatar-mask")}></div>
          </div>
          <div className={cx("info-wrapper")}>
            <p className={cx("nickname")}>{data?.fullname}</p>
            <p className={cx("extract-time")}>
              <span className={cx("extract")}>""</span>
              <span className={cx("time")}>7:09 PM</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageItem;
