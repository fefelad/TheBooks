import Hero from "../../Components/Layout/Hero/Hero";
import Layout from "../../Components/Layout/Layout";
import styles from "./Home.module.scss";

function Home() {
  return (
    <main className={styles.wrapper_home}>
      <Layout>
        <Hero />
      </Layout>
    </main>
  );
}

export default Home;
