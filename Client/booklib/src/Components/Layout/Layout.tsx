import LeftSidebar from "./Left-sidebar/LeftSidebar";
import RightSidebar from "./Right-sidebar/RightSidebar";
import styles from "./Layout.module.scss";
import type { PropsWithChildren } from "react";
function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.wrapper_loyout}>
      <LeftSidebar />
      <main className={styles.wrapper_main__side}>{children}</main>
      <RightSidebar />
    </div>
  );
}

export default Layout;
