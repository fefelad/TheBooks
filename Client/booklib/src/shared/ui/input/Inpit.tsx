import styles from "./Input.module.scss";

interface IInput {
  type: "text" | "submit" | "password";
  plasholder?: "email" | "Username" | "password";
  autoComplete?: string;
}

function Input({
  type,
  plasholder,
  ...rest
}: IInput & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={styles.input}
      autoComplete={"autoComplete"}
      type={type}
      placeholder={plasholder}
      {...rest}
    />
  );
}

export default Input;
