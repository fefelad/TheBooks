import Input from "../../../shared/ui/input/Inpit";
import styles from "./Login.module.scss";

function Login() {
  return (
    <form className={styles.wrapper_form} action="">
      <Input type="text" plasholder="Username" />
      <Input type="text" plasholder="email" />
      <Input type="password" plasholder="password" />
      <Input type="submit" />
    </form>
  );
}

export default Login;
