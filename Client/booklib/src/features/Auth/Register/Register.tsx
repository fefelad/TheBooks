import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "../../../shared/ui/input/Inpit";
import styles from "./Register.module.scss";
import Btn from "../../../shared/ui/Btn/Btn";

interface IRegister {
  username: string;
  email: string;
  password: number;
  password1: number;
}

function Register() {
  const { register, handleSubmit, formState, watch } = useForm<IRegister>({
    mode: "onChange",
  });
  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;

  const password = watch("password");
  const confirmPassword = watch("password1");

  const validatePssword = (valet: number) => {
    return valet === password || "Пароли не совпадают";
  };

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.wrapper_form}
      action=""
    >
      <div className={styles.wrapper_form__input}>
        <label className={styles.wrapper_form__label}>Username</label>
        <Input
          type="text"
          plasholder="Username"
          {...register("username", { required: "Введите свое Имя" })}
        />
      </div>
      <div className={styles.wrapper_form__input}>
        <label className={styles.wrapper_form__label}>Email</label>
        <Input
          type="text"
          plasholder="email"
          {...register("email", {
            required: "Введите свою почту",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Введите корректный email",
            },
          })}
        />
      </div>
      {emailError && <p className={styles.wrapper_form__error}>{emailError}</p>}
      <div className={styles.wrapper_form__input}>
        <label className={styles.wrapper_form__label}>Password</label>
        <Input
          type="password"
          plasholder="password"
          {...register("password", { required: "Введите свой пароль" })}
        />
      </div>
      {passwordError && (
        <p className={styles.wrapper_form__error}>{passwordError}</p>
      )}
      <div className={styles.wrapper_form__input}>
        <label className={styles.wrapper_form__label}>Password</label>
        <Input
          type="password"
          plasholder="password"
          {...register("password1", {
            required: "Введите свой пароль повторно",
            validate: validatePssword,
          })}
        />
      </div>
      {password && confirmPassword && password !== confirmPassword && (
        <span style={{ color: "red" }}>Пароли не совпадают</span>
      )}
      <Btn TextBtn="Send" type="submit" />
    </form>
  );
}

export default Register;
