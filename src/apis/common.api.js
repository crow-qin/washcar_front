export default {

  
  /**
   *
   * @param {*} [params={}]
   * @return {*} 
   */
  login(params = {}) {
    return http.postJson(`/login`, params);
  }
};