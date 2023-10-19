import axios from 'axios';
import { TokenHandler } from 'auth';

const LOGIN_URL = '/api/login/';
const REFRESH_URL = '/api/refresh/';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  (config) => {
    const access = TokenHandler.getAccess();

    if (access) {
      config.headers['Authorization'] = `Bearer ${access}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async (error) => {
    const { config, response } = error;

    if (config.url !== LOGIN_URL && response?.status === 401 && !config._retry) {
      if (config.url === REFRESH_URL) {
        TokenHandler.delete();
      } else {
        const refresh = TokenHandler.getRefresh();

        try {
          const _response = await instance.post(REFRESH_URL, { refresh });
          const { access } = _response.data;
          TokenHandler.setAccess(access);
          config._retry = true;
          return instance(config);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
