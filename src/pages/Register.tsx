import React, { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { Link, useNavigate } from "react-router";
import { Paths } from "../routes/Paths";
import { useForm, type SubmitHandler } from "react-hook-form";
import CustomInput from "../components/UI/CustomInput";
import type { IRegister } from "../types";
import { useRegisterMutation } from "../services/user";
import errorMess from "../utils/errorMess";
import CustomBtn from "../components/UI/CustomBtn";

// abd17
// abd17@mail.ru
// Abdulla123

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IRegister>({mode:'onChange'});
  const registerMutation = useRegisterMutation()
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      console.log('Регистрация прошла успешно!');
      navigate(Paths.login)
      setError('');
    } catch (error) {
      console.log(error);
      setError(errorMess(error))
    }
  };
  const pass = watch('password')
  // console.log(pass);

  return (
    <AuthLayout>
      <div className="enter">
        <h1 className="enter__title">Регистрация</h1>
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
            label="Ваше имя"
            type="text"
            holder="Имя"
          />
          
          <CustomInput
            register={register("email", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            })}
            errors={errors.email}
            label="Ваша почта"
            type="email"
            holder="Почта"
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
            holder="Ваш пароль"
          />
          <CustomInput
            register={register("password2", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 8,
                message: "Минимум 8 символов",
              },
              validate: (data)=> data == pass || 'Пароли не совпадают!'
            })}
            errors={errors.password2}
            label="Повторите пароль"
            type="password"
            holder="Повторите пароль"
          />
          <CustomBtn text="Зарегистрироваться" width={248} className="enter__btn" disabled={!isValid}/>         
        </form>
        <div className="enter__info">
          {
            error && <h3 className="enter__error">{error}</h3>
          }
          <p className="enter__desc">Есть аккаунт?</p>
          <Link className="enter__link" to={Paths.login}>
            Войти
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
