import { login } from '@/business/login';

export default {
  async login( { commit }, data) {
    const res = await login(data);
    const { token, ...userData } = res;

    commit('setToken', token);
    commit('setUser', userData);
  }
};