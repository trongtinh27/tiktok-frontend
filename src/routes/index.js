// Layouts
import { HeaderOnly } from "~/components/Layout";

import Home from "~/pages/Home";
import Following from "~/pages/Following";
import Profile from "~/pages/Profile";
import Upload from "~/pages/Upload";
import { DefaultLayout } from "~/components/Layout";
// public routes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/following", component: Following },
  { path: "/profile/:nickname", component: Profile },
  { path: "/upload", component: Upload, layout: HeaderOnly },
];
// private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
