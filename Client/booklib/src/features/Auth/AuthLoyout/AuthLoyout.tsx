import { useCallback, useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import styles from "./AuthLoyout.module.scss";

function AuthLoyout() {
  const [swap, SetSwap] = useState("login");

  const HadleSwap = useCallback(() => {
    SetSwap((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  return (
    <div className={styles.wrapper_loyout}>
      <div className={styles.wrapper_loyout__header}>
        <h1 className={styles.title}>The Book</h1>
        <button className={styles.btn_swap} onClick={HadleSwap}>
          {swap === "login" ? <p>Register</p> : <p>Login</p>}
        </button>
      </div>

      <div className={styles.wrapper_loyout__form}>
        {swap === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default AuthLoyout;
