import config from "~/config";

// Layouts
import { HeaderOnly } from "~/layouts";

import Home from "~/pages/Home";
import Following from "~/pages/Following";
import Explore from "~/pages/Explore";
import Friends from "~/pages/Friends";
import Live from "~/pages/Live";
import Profile from "~/pages/Profile";
import Upload from "~/pages/Upload";
import Search from "~/pages/Search";
import Messages from "~/pages/Messages";

// public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.explore, component: Explore },
  { path: config.routes.friends, component: Friends },
  { path: config.routes.live, component: Live },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.search, component: Search },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.messages, component: Messages, layout: HeaderOnly },
];
// private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
