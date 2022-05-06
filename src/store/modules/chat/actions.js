import { ElMessage } from 'element-plus';
import io from 'socket.io-client';
import { getFriendsList } from '@/business/chat/index';

export default {
  async connectSocket({ commit, rootState, dispatch }, callback) {
    let user = rootState.user;
    let socket = io.connect(`/?userId=${user.userId}`, {
      reconnection: true
    });
    socket.on('connect', async() => {
      console.log('test-连接成功');

      socket.emit('chatData', user);
      commit('setSocket', socket);
    });
    // 初始化
    socket.on('activeGroupUser', (data) => {
      commit('setActiveChatObj', data);
    });
    
    // 添加好友 只要添加就成功 暂时不做审核
    socket.on('addFriend', async(res) => {
      console.log('test-addFriend-res', res);
      if (res.code == 0) {
        dispatch('getFriendsList');
        ElMessage({
          message: '添加好友成功',
          type: 'success'
        });
        socket.emit('joinFriendSocket', {
          userId: user.userId,
          friendId: res.data.userId,
        });
      } else {
        ElMessage({
          message: res.msg,
          type: 'error'
        });
      }
    });

    socket.on('joinFriendSocket', (res) => {
      if (res.code == 0) {
        console.log('testOnly-suc join friend socket');
      }
    });
    socket.on('friendMsg', () => {

    });
    socket.on('chatData', (res) => {
      if (res.code == 0) {
        console.log('test-chatData', res);
      }
    });
  },
  /**获取好友列表 */
  async getFriendsList({ commit,rootState }) {
    console.log('test-rootState', rootState.user.userId)
    const res = await getFriendsList({ userId: rootState.user.userId });
    commit('setFriendsInfo', res || []);
    return res || [];
  },
};
