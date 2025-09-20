import Navigation from "../../Navigation/Navigation";
import styls from "./LeftSidebar.module.scss";

function LeftSidebar() {
  return (
    <aside className={styls.aside_wrapper__left}>
      <h1 className={styls.aside_title__header}>The Books</h1>
      <p className={styls.aside_text__menu}>Menu</p>
      <Navigation />
    </aside>
  );
}

export default LeftSidebar;
