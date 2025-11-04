import { useAuth } from "../../../shared/hook/UseAuth";
import styles from "./RightSidebar.module.scss";

function RightSidebar() {
  const { user } = useAuth();
  return (
    <aside className={styles.aside_wrapper__right}>
      <div className={styles.aside_wrapper__background}>
        <h1 className={styles.aside_wrapper__name}> {user?.username}</h1>
      </div>
    </aside>
  );
}

export default RightSidebar;
