import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "~/layouts";
import AuthModal, { AuthProvider } from "~/components/AuthModal";

function App() {
  const currentUser = false;

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
                    <Layout currentUser={currentUser}>
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
