import styles from "./Input.module.scss";

interface IInput {
  type: "text" | "submit" | "password";
  plasholder?: "email" | "Username" | "password";
}

function Input({ type, plasholder }: IInput) {
  return (
    <input className={styles.input} type={type} placeholder={plasholder} />
  );
}

export default Input;
