import { useForm } from "react-hook-form";
import Input from "../../../shared/ui/input/Inpit";
import styles from "./Register.module.scss";
import Btn from "../../../shared/ui/Btn/Btn";
import type { RegisterData } from "../../../shared/type/auth.types";
import { useAuth } from "../../../shared/hook/UseAuth";
function Register() {
  const { register, handleSubmit, formState, watch } = useForm<RegisterData>({
    mode: "onChange",
  });

  const { register: registerUser, isLoading, error, clearError } = useAuth(); // Добавляем функции из store

  const watchPassword = watch("password");

  const validatePassword = (value: string) => {
    return value === watchPassword || "Пароли не совпадают";
  };

  const onSubmit = async (data: RegisterData) => {
    clearError();
    try {
      await registerUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      {error && (
        <div className={styles.wrapper_form__error_global}>{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper_form}>
        <div className={styles.wrapper_form__input}>
          <label className={styles.wrapper_form__label}>Username</label>
          <Input
            type="text"
            plasholder="Username"
            {...register("username", {
              required: "Введите свое Имя",
              minLength: {
                value: 3,
                message: "Минимум 3 символа",
              },
            })}
          />
          {formState.errors.username && (
            <p className={styles.wrapper_form__error}>
              {formState.errors.username.message}
            </p>
          )}
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
          {formState.errors.email && (
            <p className={styles.wrapper_form__error}>
              {formState.errors.email.message}
            </p>
          )}
        </div>

        <div className={styles.wrapper_form__input}>
          <label className={styles.wrapper_form__label}>Password</label>
          <Input
            type="password"
            plasholder="password"
            {...register("password", {
              required: "Введите свой пароль",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            })}
          />
          {formState.errors.password && (
            <p className={styles.wrapper_form__error}>
              {formState.errors.password.message}
            </p>
          )}
        </div>

        <div className={styles.wrapper_form__input}>
          <label className={styles.wrapper_form__label}>
            Подтвердите пароль
          </label>
          <Input
            type="password"
            plasholder="password"
            {...register("confirmPassword", {
              required: "Подтвердите пароль",
              validate: validatePassword,
            })}
          />
          {formState.errors.confirmPassword && (
            <p className={styles.wrapper_form__error}>
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Btn
          TextBtn={isLoading ? "Регистрация..." : "Зарегистрироваться"}
          type="submit"
        />
      </form>
    </div>
  );
}

export default Register;
