
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
  actions: {}
};