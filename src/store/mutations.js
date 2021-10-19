import { setToken } from '@/utils/auth.util';
import axios from 'axios';

export default {
  setToken(state, token) {
    state.token = token;
    setToken(token);
    axios.interceptors.request.use(config => {
      config.headers.Authorization = token;
      return config;
    });
  },
  setUser(state, user) {
    state.user = user;
  }
};