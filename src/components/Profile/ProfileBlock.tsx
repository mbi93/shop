import React, { useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Paths } from "../../routes/Paths";
import errorMess from "../../utils/errorMess";
import CustomInput from "../UI/CustomInput";
import CustomBtn from "../UI/CustomBtn";
import { userPhoto } from "../../utils";
import { userStore } from "../../store/userStore";
import type { IProfile } from "../../types";
import {
  useCustomUser,
  useProfileAvatarMutation,
  useProfileMutation,
} from "../../services/user";

const ProfileBlock = () => {
  const { user } = userStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProfile>({ mode: "onChange" });
  const profileMutation = useProfileMutation();
  const profileAvatarMutation = useProfileAvatarMutation();
  const currentUser = useCustomUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [image, setImage] = useState("");

  const changeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        const str = typeof reader.result == "string" ? reader.result : "";
        setImage(str);
      };
    }
  };

  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    try {
      const { username, email, password, avatar } = data;
      if (user) {
        await profileMutation.mutateAsync({
          id: user.id,
          username,
          email,
          password,
        });
        if (avatar.length) {
          const formData = new FormData();
          formData.append("avatar", avatar[0]);
          await profileAvatarMutation.mutateAsync({
            id: user.id,
            avatar: formData,
          });
        }
        currentUser.refetch();
        console.log("Измения прошли успешно!");
        navigate(Paths.menu);
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError(errorMess(error));
    }
  };

  return (
    <div className="enter">
      <h1 className="enter__title">Редактирование профиля</h1>
      {user ? (
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
              value: user.username,
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
              value: user.email,
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
            register={register("avatar", {
              onChange: changeImage,
            })}
            errors={errors.avatar}
            label="Изменить фото профиля"
            type="file"
            holder="Фото"
          />
          {image ? (
            <img src={image} alt="" />
          ) : user.avatar ? (
            <img
              className="enter__img"
              src={import.meta.env.VITE_IMG_URL + user.avatar}
              alt=""
            />
          ) : (
            <img className="enter__img" src={userPhoto} alt="" />
          )}
          <CustomBtn
            text="Изменить"
            width={248}
            className="enter__btn"
            disabled={!isValid}
          />{" "}
        </form>
      ) : (
        <h2>Loading...</h2>
      )}

      <div className="enter__info">
        {error && <h3 className="enter__error">{error}</h3>}
        <Link className="enter__link" to={Paths.menu}>
          На главную
        </Link>
      </div>
    </div>
  );
};
export default ProfileBlock;
