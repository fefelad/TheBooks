// import Hero from "../Components/Layout/Hero/Hero";
// import Layout from "../Components/Layout/Layout";
import AuthLoyout from "../features/Auth/AuthLoyout/AuthLoyout";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <div className={styles.wrapper_app}>
        {/* <Layout>
          <Hero />
        </Layout> */}
        <AuthLoyout />
      </div>
    </>
  );
}

export default App;
