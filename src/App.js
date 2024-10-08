import React, { Fragment, createContext } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider } from "~/contexts/UserContext";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "~/layouts";
import AuthModal, { AuthProvider } from "~/components/AuthModal";

// Tạo Context để cung cấp hàm gửi thông báo
const NotificationContext = createContext();

function App() {
  const notify = (title, message, type = "default") => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      container: "top-center",
      insert: "top",
      animationIn: ["animate__animated", "animate__fadeIn"], // animation when the notification is added
      animationOut: ["animate__animated", "animate__fadeOut"], // animation when the notification is removed
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  return (
    <AuthProvider>
      <UserProvider>
        <NotificationContext.Provider value={notify}>
          <Router>
            <div className="App">
              <ReactNotifications />
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
                        <Layout>
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
        </NotificationContext.Provider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
export { NotificationContext };
