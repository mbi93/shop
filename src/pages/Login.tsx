import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { Link, useNavigate } from "react-router";
import { Paths } from "../routes/Paths";
import { useForm, type SubmitHandler } from "react-hook-form";
import CustomInput from "../components/UI/CustomInput";
import type { ILogin, } from "../types";
import { useLoginMutation} from "../services/user";
import errorMess from "../utils/errorMess";
import CustomBtn from "../components/UI/CustomBtn";

// abd17
// abd17@mail.ru
// Abdulla123

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>({ mode: "onChange" });
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      console.log("Авторизация прошла успешно!");
      navigate(Paths.menu);
      setError("");
    } catch (error) {
      console.log(error);
      setError(errorMess(error));
    }
  };

  return (
    <AuthLayout>
      <div className="enter">
        <h1 className="enter__title">Вход</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="enter__form"
        >
          <CustomInput
            register={register("username", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
            })}
            errors={errors.username}
            label="Ваш логин"
            type="text"
            holder="Логин"
          />

          <CustomInput
            register={register("password", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 8,
                message: "Минимум 8 символов",
              },
            })}
            errors={errors.password}
            label="Ваш пароль"
            type="password"
            holder="Пароль"
          />          
          <CustomBtn text="Вход" width={248} className="enter__btn" disabled={!isValid}/>
        </form>
        <div className="enter__info">
          {error && <h3 className="enter__error">{error}</h3>}
          <p className="enter__desc">Нет аккаунта?</p>
          <Link className="enter__link" to={Paths.register}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
