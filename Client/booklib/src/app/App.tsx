// import Hero from "../Components/Layout/Hero/Hero";
// import Layout from "../Components/Layout/Layout";
// import Test from "../Components/Test/Test";
import { useEffect } from "react";
import AuthLoyout from "../features/Auth/AuthLoyout/AuthLoyout";
import { useAuth } from "../shared/hook/UseAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.scss";
import Home from "../Page/Home/Home";

function App() {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <div className={styles.wrapper_app}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/auth"
              element={
                !isAuthenticated ? (
                  <AuthLoyout />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />
            <Route
              path="/home"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/auth" replace />
              }
            />

            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/home" : "/auth"} replace />
              }
            />
          </Routes>
        </BrowserRouter>
        {/* <Layout>
          <Hero />
        </Layout> */}
        {/* <AuthLoyout /> */}

        {/* <Test /> */}
      </div>
    </>
  );
}

export default App;
