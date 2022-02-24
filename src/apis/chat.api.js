export default {
  /**
   * 获取好友列表
   * @returns 
   */
  getFriendList() {
    return http.postJson('/friend/getLists')
  }
}