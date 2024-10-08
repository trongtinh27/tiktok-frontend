import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import config from "~/config";
import styles from "./Emoji.module.scss";

const cx = classNames.bind(styles);

function Emoji({ handleEmojiClick, visible, handleEmoji }) {
  const emojiArray = config.emojiArray;

  return (
    <HeadlessTippy
      visible={visible}
      interactive
      placement="top"
      onClickOutside={handleEmoji}
    >
      <div className={cx("wrapper")} tabIndex="-1">
        <div className={cx("container")}>
          <div className={cx("emoji-container")}>
            <ul className={cx("list-emoji")}>
              {emojiArray.map((emoji, index) => (
                <li
                  key={emoji.label}
                  data-index={index}
                  aria-label={emoji.label}
                  role="button"
                  onClick={() => handleEmojiClick(emoji.value)}
                >
                  {emoji.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </HeadlessTippy>
  );
}

export default Emoji;
