import Hero from "../Components/Layout/Hero/Hero";
import Layout from "../Components/Layout/Layout";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <div className={styles.wrapper_app}>
        <Layout>
          <Hero />
        </Layout>
      </div>
    </>
  );
}

export default App;
