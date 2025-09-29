import { useAuth } from "../../../shared/hook/UseAuth";
import styles from "./RightSidebar.module.scss";

function RightSidebar() {
  const { user } = useAuth();
  return (
    <aside className={styles.aside_wrapper__right}>
      <h1> Добро пожаловать, {user?.username}!</h1>
      <p>Ваша почта {user?.email}</p>
    </aside>
  );
}

export default RightSidebar;
