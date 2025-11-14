import { useQuery, useMutation } from "@tanstack/react-query";
import api from "./api";
import type { ILogin, IRegister } from "../types";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (userData: IRegister) => api.post("/auth/register", userData),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (userData: ILogin) => api.post("/auth/login", userData),
    onSuccess: ({ data }) => {
      if (data && data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
      }
    },
  });
};

export const useCustomUser = () => {
  const localAccess = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["current"],
    queryFn: () => api.get("/auth/users/profile"),
    enabled: !!localAccess,
    select: (response) => response.data,
  });
};

interface IProfileInfo {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const useProfileMutation = () => {
  return useMutation({
    mutationFn: (userData: IProfileInfo) => {
      const { id, username, email, password } = userData;
      return api.put(`/auth/users/${id}/update`, { username, email, password });
    },
  });
};

interface IProfileAvatar {
  id: number;
  avatar: FormData;
}

export const useProfileAvatarMutation = () => {
  return useMutation({
    mutationFn: (userData: IProfileAvatar) => {
      const { id, avatar } = userData;
      return api.put(`/auth/users/${id}/update/avatar`, avatar);
    },
  });
};
