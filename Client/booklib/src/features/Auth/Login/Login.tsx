import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "../../../shared/ui/input/Inpit";
import styles from "./Login.module.scss";
import Btn from "../../../shared/ui/Btn/Btn";

interface ILogin {
  username: string;
  email: string;
  password: number;
}

function Login() {
  const { register, handleSubmit, formState } = useForm<ILogin>({
    mode: "onChange",
  });

  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.wrapper_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper_form__input}>
        <label className={styles.wrapper_form__label}>Username</label>
        <Input
          {...register("username", { required: "Введите свое Имя" })}
          type="text"
          plasholder="Username"
        />
      </div>
      <div className={styles.wrapper_form__input}>
        <label className={styles.wrapper_form__label}>Email</label>
        <Input
          {...register("email", {
            required: "Введите свою почту",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Введите корректный email",
            },
          })}
          type="text"
          plasholder="email"
        />
      </div>
      {emailError && <p className={styles.wrapper_form__error}>{emailError}</p>}
      <div className={styles.wrapper_form__input}>
        <label className={styles.wrapper_form__label}>Password</label>
        <Input
          {...register("password", { required: "Введите свой пароль" })}
          type="password"
          plasholder="password"
          autoComplete="current-password"
        />
      </div>
      {passwordError && (
        <p className={styles.wrapper_form__error}>{passwordError}</p>
      )}

      <Btn TextBtn="Send" type="submit" />
    </form>
  );
}

export default Login;
