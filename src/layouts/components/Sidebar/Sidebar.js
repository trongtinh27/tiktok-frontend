import classNames from "classnames/bind";
import { useAuth } from "~/components/AuthModal";
import { useEffect, useState } from "react";

import * as followService from "~/services/followService";
import { useUser } from "~/contexts/UserContext";
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
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";

const cx = classNames.bind(styles);

function SideBar() {
  const axiosInstance = useAxiosWithInterceptor();
  const { user, isLoggedIn } = useUser();
  // State
  const [listFollowing, setListFollowing] = useState([]);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

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

  const { setIsOpenLogin } = useAuth();

  const handleLoginClick = () => {
    setIsOpenLogin(true); // Mở modal đăng nhập
  };

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const getListFollowing = async () => {
        try {
          const res = await followService.getListFollowingApi(
            axiosInstance,
            user.id,
            offset,
            limit
          );
          if (res.status === 200) {
            setListFollowing((prev) => {
              if (prev.length === 0) {
                return res.data;
              } else {
                return [...prev, ...res.data];
              }
            });
            if (res.data.length < limit) {
              setHasMore(false);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      getListFollowing();
    }
  }, [offset, limit, isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cx("wrapper")}>
      <aside className={cx("scroll-container")}>
        <div className={cx("sidebar-container")}>
          <div className={cx("menu-container")}>
            <Menu>
              {isLoggedIn
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
            {isLoggedIn ? (
              <AccountFollow hasMore={hasMore} handleShowMore={handleShowMore}>
                {listFollowing?.map((account, index) => (
                  <AccountFollowItem key={index} accountData={account} />
                ))}
              </AccountFollow>
            ) : (
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

export default SideBar;
