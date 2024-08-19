import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Menu, { MenuItem } from "./Menu";
import AccountFollow, { AccountFollowItem } from "./AccountFollow";
import Footer, { FooterItem } from "./Footer";

import styles from "./Sidebar.module.scss";
import Image from "~/components/Image";
import Button from "~/components/Button";

import {
  HomeIcon,
  HomeIconActive,
  ExploreIcon,
  ExploreIconActive,
  FollowIcon,
  FollowIconActive,
  FriendsIcon,
  FriendsIconActive,
  UserGroupIcon,
  UserGroupIconActive,
  UserIcon,
  LiveIcon,
  LiveIconActive,
  UploadIcon,
} from "~/components/Icons";
import config from "~/config";

const cx = classNames.bind(styles);

const loggedInUsers = [
  {
    title: "Dành cho bạn",
    to: config.routes.home,
    icon: <HomeIcon />,
    iconActive: <HomeIconActive />,
  },
  {
    title: "Khám phá",
    to: config.routes.explore,
    icon: <ExploreIcon />,
    iconActive: <ExploreIconActive />,
  },
  {
    title: "Đang Follow",
    to: config.routes.following,
    icon: <FollowIcon className={cx("icon")} />,
    iconActive: <FollowIconActive className={cx("icon")} />,
  },
  {
    title: "Bạn bè",
    to: config.routes.friends,
    icon: <FriendsIcon />,
    iconActive: <FriendsIconActive />,
  },
  {
    title: "LIVE",
    to: config.routes.live,
    icon: <LiveIcon />,
    iconActive: <LiveIconActive />,
  },
  {
    title: "Tải lên",
    to: config.routes.upload,
    icon: <UploadIcon className={cx("icon")} />,
    iconActive: null,
  },
  {
    title: "Hồ sơ",
    to: config.routes.profile,
    icon: (
      <Image
        className={styles.avatar}
        src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/579e8895677e86683abb0f2a1583a44e.jpeg?lk3s=a5d48078&nonce=84119&refresh_token=44364db61f4534be061a3249bf9b8378&x-expires=1723899600&x-signature=9E%2FQ3IvDzSVB9IbxZUOOsPllINQ%3D&shp=a5d48078&shcp=81f88b70"
        alt="ảnh đại diện"
      ></Image>
    ),
    iconActive: (
      <Image
        className={styles.avatar}
        src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/579e8895677e86683abb0f2a1583a44e.jpeg?lk3s=a5d48078&nonce=84119&refresh_token=44364db61f4534be061a3249bf9b8378&x-expires=1723899600&x-signature=9E%2FQ3IvDzSVB9IbxZUOOsPllINQ%3D&shp=a5d48078&shcp=81f88b70"
        alt="ảnh đại diện"
      ></Image>
    ),
  },
];

const anonymousUsers = [
  {
    title: "Dành cho bạn",
    to: config.routes.home,
    icon: <HomeIcon />,
    iconActive: <HomeIconActive />,
  },
  {
    title: "Khám phá",
    to: config.routes.explore,
    icon: <ExploreIcon />,
    iconActive: <ExploreIconActive />,
  },
  {
    title: "Đang Follow",
    to: config.routes.following,
    icon: <UserGroupIcon />,
    iconActive: <UserGroupIconActive />,
  },
  {
    title: "LIVE",
    to: config.routes.live,
    icon: <LiveIcon />,
    iconActive: <LiveIconActive />,
  },
  {
    title: "Hồ sơ",
    to: "/@",
    icon: <UserIcon className={cx("icon")} />,
    iconActive: null,
  },
];

function SideBar({ currentUser }) {
  const userStatus = currentUser;

  return (
    <div className={cx("wrapper")}>
      <aside className={cx("scroll-container")}>
        <div className={cx("sidebar-container")}>
          <div className={cx("menu-container")}>
            <Menu>
              {userStatus
                ? loggedInUsers.map((data) => (
                    <MenuItem
                      key={data.title}
                      title={data.title}
                      to={data.to}
                      icon={data.icon}
                      iconActive={data.iconActive}
                    />
                  ))
                : anonymousUsers.map((data) => (
                    <MenuItem
                      key={data.title}
                      title={data.title}
                      to={data.to}
                      icon={data.icon}
                      iconActive={data.iconActive}
                    />
                  ))}
            </Menu>
            {!userStatus && (
              <div className={cx("login-container")}>
                <p className={cx("login-hint")}>
                  Đăng nhập để follow các tác giả, thích video và xem bình luận.
                </p>
                <Button outline large className={cx("btn-login")}>
                  Đăng nhập
                </Button>
              </div>
            )}
            {userStatus && (
              <AccountFollow>
                <AccountFollowItem />
                <AccountFollowItem />
                <AccountFollowItem />
                <AccountFollowItem />
                <AccountFollowItem />
                <AccountFollowItem />
                <AccountFollowItem />
                <AccountFollowItem />
              </AccountFollow>
            )}

            <Footer>
              <FooterItem title={"Công ty"} />
              <FooterItem title={"Chương trình"} />
              <FooterItem title={"Điều khoản và chính sách"} />
            </Footer>
          </div>
        </div>
      </aside>
    </div>
  );
}

SideBar.propTypes = {
  currentUser: PropTypes.bool.isRequired,
};

export default SideBar;
