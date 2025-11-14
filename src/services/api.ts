import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const localAccess = localStorage.getItem("access_token");
    if (localAccess && localAccess !== null) {
      config.headers.Authorization = `Bearer ${localAccess}`;
    }
    // console.log(config);
    return config;
  },
  (error) => {
    console.log(error);
  }
);

async function refreshTokens() {
  try {
    const refresh = localStorage.getItem("refresh_token");
    if(refresh){      
      const response = await api.post("/auth/login/refresh", {
        refresh,
      });
      const data = response.data;
      if (data && data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        return data.access
      } else {
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
      }
    }
    else {
      return null
    }
  } catch (error) {
    console.log("Ошибка обновления токена ", error);
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const config = error.config;
    if (error.status == 401) {
      const accessToken = await refreshTokens();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return api(config)        
      }
      else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
