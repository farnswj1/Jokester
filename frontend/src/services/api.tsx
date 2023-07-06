import axios from 'axios';
import { TokenHandler } from 'auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
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

    if (config.url !== '/api/login/' && response?.status === 401 && !config._retry) {
      if (config.url === '/api/refresh/') {
        TokenHandler.delete();
      } else {
        const refresh = TokenHandler.getRefresh();

        try {
          const _response = await instance.post('/api/refresh/', { refresh });
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
