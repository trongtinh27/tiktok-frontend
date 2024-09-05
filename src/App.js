import { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as authService from "~/services/authService";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "~/layouts";
import AuthModal, { AuthProvider } from "~/components/AuthModal";

function App() {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = cookies.token;

  useEffect(() => {
    if (token !== undefined) {
      const loadProfile = async () => {
        try {
          const userInfo = await authService.profileApi(token);
          setUser(userInfo.data);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error loading profile:", error);
          setIsLoggedIn(false);
        }
      };
      loadProfile();
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout currentUser={isLoggedIn} user={user}>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
        <AuthModal />
      </Router>
    </AuthProvider>
  );
}

export default App;
