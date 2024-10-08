import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import {
  faEarthAsia,
  faHouseChimney,
  faCircleQuestion,
  faMoon,
  faLightbulb,
  faUser,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import config from "~/config";
import { useUser } from "~/contexts/UserContext";
import style from "./Header.module.scss";
import images from "~/assets/images";
import Button from "~/components/Button";
import Image from "~/components/Image";
import Search from "../Search";
import { useAuth } from "~/components/AuthModal";
import Menu from "~/components/Popper/Menu";
import {
  MessageIcon,
  MessageActiveIcon,
  InboxIcon,
  MoreIcon,
} from "~/components/Icons";

const cx = classNames.bind(style);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>,
    title: "Công cụ danh cho nhà sáng tạo",
    children: {
      title: "Công cụ danh cho nhà sáng tạo",
      data: [
        {
          icon: <FontAwesomeIcon icon={faLightbulb}></FontAwesomeIcon>,
          title: "Trung tâm Nhà sáng tạo Live",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
    title: "Tiếng Việt",
    children: {
      title: "Ngôn ngữ",
      data: [
        {
          code: "en",
          title: "English",
        },
        {
          code: "vi",
          title: "Tiếng Việt",
        },
      ],
    },
  },

  {
    icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
    title: "Phản hồi và trợ giúp",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>,
    title: "Chế độ tối",
    children: {
      title: "Chế độ tối",
      data: [
        {
          type: "default",
          title: "Sử dụng chủ đề của thiết bị",
        },
        {
          type: "dark",
          title: "Chế độ tối",
        },
        {
          type: "light",
          title: "Chế độ sáng",
        },
      ],
    },
  },
];

function Header() {
  const { user, isLoggedIn } = useUser();

  const { setIsOpenLogin } = useAuth();

  const handleLoginClick = () => {
    setIsOpenLogin(true); // Mở modal đăng nhập
  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsOpenLogin(false);
    }
  }, [isLoggedIn, setIsOpenLogin, user]);

  const handleChangeItemMenu = (menuItem) => {
    console.log(menuItem);
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
      title: "Xem hồ sơ",
      to: `/@${user?.username}`,
    },
    {
      icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
      title: "Cài đặt",
      to: "/setting",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>,
      logout: true,
      title: "Đăng xuất",
    },
  ];

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("left-container")}>
          <div className={cx("logo")}>
            <a href={config.routes.home}>
              <img src={images.logo} alt="TikTok" />
            </a>
          </div>
        </div>
        <div className={cx("center-container")}>
          <div className={cx("search-container")}>
            <Search></Search>
          </div>
        </div>
        <div className={cx("right-container")}>
          {isLoggedIn ? (
            <>
              <div className={cx("message-container")}>
                <Tippy delay={[0, 200]} content="Tin nhắn" placement="bottom">
                  <div className={cx("message-icon")}>
                    <NavLink
                      className={({ isActive }) =>
                        cx("btn", { active: isActive })
                      }
                      to="/messages"
                    >
                      {({ isActive }) => (
                        <>
                          {isActive ? <MessageActiveIcon /> : <MessageIcon />}
                          <sup className={cx("message-supbadge")}>1</sup>
                        </>
                      )}
                    </NavLink>
                  </div>
                </Tippy>
              </div>

              <Tippy delay={[0, 200]} content="Hộp thư" placement="bottom">
                <div role="button" className={cx("inbox-container")}>
                  <span>
                    <InboxIcon className={cx("inbox-icon")} />
                    <sup className={cx("inbox-supbadge")}>1</sup>
                  </span>
                </div>
              </Tippy>
              <Menu items={userMenu} onChange={handleChangeItemMenu}>
                <div role="button" className={cx("profile-container")}>
                  <Image src={user?.avatarURL} alt="ảnh đại diện"></Image>
                </div>
              </Menu>
            </>
          ) : (
            <>
              <Button primary medium onClick={handleLoginClick}>
                Đăng nhập
              </Button>
              <Menu items={MENU_ITEMS} onChange={handleChangeItemMenu}>
                <MoreIcon className={cx("imore-icon-wrapper")} role="button" />
              </Menu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
