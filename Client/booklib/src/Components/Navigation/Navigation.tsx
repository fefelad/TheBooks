import styles from "./Navigation.module.scss";
import { MdHome } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoIosBookmarks } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";
import { useAuth } from "../../shared/hook/UseAuth";

function Navigation() {
  const { logout } = useAuth();

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <div className={styles.box}>
            <MdHome size={25} />
          </div>
          <a href="">Discover</a>
        </li>

        <li>
          <BiSolidCategoryAlt size={25} />
          <a href="">Category</a>
        </li>

        <li>
          <IoIosBookmarks size={25} />
          <a href="">My Library</a>
        </li>

        <li>
          <FaShoppingCart size={25} />
          <a href="">Your cart</a>
        </li>

        <li className={styles.favorite}>
          <MdFavorite size={25} />
          <a href="">Favorite</a>
        </li>
      </ul>
      <hr className={styles.border_hr} />
      <ul className={styles.accoutn_link}>
        <li>
          <IoMdSettings size={25} />
          <a href="">Setting</a>
        </li>
        <li>
          <IoIosHelpCircle size={25} />
          <a href="">Help</a>
        </li>
        <li className={styles.log_out}>
          <IoLogInOutline size={25} />
          <button onClick={logout}>log out</button>
        </li>

        <hr className={styles.border_hr} />
      </ul>
    </nav>
  );
}

export default Navigation;
