export default {
  /**
   * 获取好友列表
   * @returns 
   */
  getFriendsList(params) {
    return http.postJson('/friend/getLists', params);
  },
};
