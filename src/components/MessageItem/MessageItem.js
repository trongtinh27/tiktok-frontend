import classNames from "classnames/bind";

import * as chatService from "~/services/chatService";

import Image from "~/components/Image";
import styles from "./MessageItem.module.scss";

const cx = classNames.bind(styles);
function MessageItem({
  data,
  connect,
  axiosInstance,
  user,
  setRoomId,
  setReceiverId,
}) {
  const createChatRoom = () => {
    const callApi = async () => {
      try {
        const fetchApi = await chatService.createChatRoomApi(
          axiosInstance,
          user.id,
          data?.id
        );

        if (fetchApi.status === 200) {
          setRoomId(fetchApi.data);
        }
      } catch (error) {}
    };
    callApi();
    connect();
    setReceiverId(data?.id);
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
