export default {
  searchUser(params) {
    return http.postJson('/user/searchUser', params);
  }
};
