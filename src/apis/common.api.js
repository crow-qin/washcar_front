// import http from '@/apis/utils/http.js';
export default {
  
  /**
   *
   * @param {*} [params={}]
   * @return {*} 
   */
  login(params = {}) {
    return http.postJson(`/login`, params);
  },

  register(params) {
    return http.postJson('/register', params);
  },

  addUser(params = {}) {
    return http.postJson('/register', params);
  }
};