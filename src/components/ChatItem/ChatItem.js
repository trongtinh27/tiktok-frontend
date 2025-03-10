import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Image from "~/components/Image";
import { useUser } from "~/contexts/UserContext";
import styles from "./ChatItem.module.scss";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";

const cx = classNames.bind(styles);

function ChatItem({ data }) {
  const { user } = useUser();

  let isSender = data?.sender?.id === user.id; // Tính toán trực tiếp mỗi khi Render

  const formatDate = (dateInput) => {
    // Chuyển đổi chuỗi thành đối tượng Date
    const date = new Date(dateInput);

    // Các mảng tháng và ngày
    const months = [
      "Tháng Một",
      "Tháng Hai",
      "Tháng Ba",
      "Tháng Tư",
      "Tháng Năm",
      "Tháng Sáu",
      "Tháng Bảy",
      "Tháng Tám",
      "Tháng Chín",
      "Tháng Mười",
      "Tháng Mười Một",
      "Tháng Mười Hai",
    ];

    // Lấy các thành phần của ngày
    const day = date.getDate(); // Ngày
    const month = months[date.getMonth()]; // Tháng
    const year = date.getFullYear(); // Năm
    const hours = String(date.getHours()).padStart(2, "0"); // Giờ
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Phút

    // Trả về chuỗi định dạng theo yêu cầu
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container", isSender ? "isSender" : "isReceiver")}>
          <Link to="@/admin">
            <span className={cx("avatar-container")}>
              <Image className={cx("avatar")} src={data?.sender?.avatar} />
            </span>
          </Link>
          <Tippy
            delay={[0, 200]}
            content={formatDate(data?.created)}
            placement={isSender ? "left" : "right"}
          >
            <div
              className={cx(
                "text-container",
                isSender ? "text-Sender" : "text-Receiver"
              )}
            >
              <p className={cx("chat-content")}>{data?.content}</p>
            </div>
          </Tippy>
        </div>
      </div>
    </>
  );
}

export default ChatItem;
