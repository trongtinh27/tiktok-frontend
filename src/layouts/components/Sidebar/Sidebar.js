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
import { useAuth } from "~/components/AuthModal";
import config from "~/config";

const cx = classNames.bind(styles);

function SideBar({ currentUser, user }) {
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
      to: `/@${user?.username}`,
      icon: (
        <Image
          className={styles.avatar}
          src={user?.avatarURL}
          alt={user?.fullName}
        ></Image>
      ),
      iconActive: (
        <Image
          className={styles.avatar}
          src={user?.avatarURL}
          alt={user?.fullName}
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
      iconActive: <UserIcon className={cx("icon")} />,
    },
  ];
  const userStatus = currentUser;

  const { setIsOpenLogin } = useAuth();

  const handleLoginClick = () => {
    setIsOpenLogin(true); // Mở modal đăng nhập
  };

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
                <Button
                  outline
                  large
                  className={cx("btn-login")}
                  onClick={handleLoginClick}
                >
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
  user: PropTypes.any,
};

export default SideBar;
