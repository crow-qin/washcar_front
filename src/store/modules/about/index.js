
export default {
  namespaced: true,
  state: {
    user: {
      name: '',
      password: ''
    },
  },
  mutations: {
    setUser(state, obj) {
      state.user = obj;
    },
  },
  actions: {
    setUserAsync({ commit }) {
      const user = {
        name: '123',
        password: '123',
      };
      commit('setUser',user);
    }
  }
};