import { useForm } from "react-hook-form";
import Input from "../../../shared/ui/input/Inpit";
import styles from "./Login.module.scss";
import Btn from "../../../shared/ui/Btn/Btn";
import type { LoginData } from "../../../shared/type/auth.types";
import { useAuth } from "../../../shared/hook/UseAuth";

function Login() {
  const { register, handleSubmit, formState } = useForm<LoginData>({
    mode: "onChange",
  });

  const { login, isLoading, error, clearError } = useAuth();

  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;

  const onSubmit = async (data: LoginData) => {
    clearError();
    try {
      await login(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      {error && (
        <div className={styles.wrapper_form__error_global}>{error}</div>
      )}

      <form className={styles.wrapper_form} onSubmit={handleSubmit(onSubmit)}>
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
        {emailError && (
          <p className={styles.wrapper_form__error}>{emailError}</p>
        )}

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

        <Btn TextBtn={isLoading ? "Вход..." : "Войти"} type="submit" />
      </form>
    </div>
  );
}

export default Login;
