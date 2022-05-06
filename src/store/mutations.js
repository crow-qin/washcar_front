import { setToken,setUser } from '@/utils/auth.util';
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
    setUser(user);
    state.user = user;
  }
};