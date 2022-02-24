<template>
  <div class="chat">
    <div class="chat-part">
      <el-input class="chat-part-search" v-model="kw"></el-input>
      <el-icon>
        <Search/>
      </el-icon>
      <div>
        <div v-for="v in chatList" :key="v">{{ v }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { getFriendList } from '@/business/chat/index';
import useStore from 'element-plus/es/components/table/src/store';
export default {
  name: 'chat',
  setup() {
    const kw = ref('');
    const chatList = reactive([1]);
    const store = useStore();
    console.log('test-store.state.user', store.state.user);
    const getChatList = async() => {
      // const res = await getFriendList({ userId: store.state.user})
    };
    return {
      kw,
      chatList,
    };
  }
};
</script>

<style lang="scss">
.chat {
  display: flex;
  .chat-part {
    min-width: 200px;
    width: 20%;
    .chat-part-search {
      width: calc(100% - 16px);
    }
    .el-icon {
      padding-top: 8px;
    }
  }
  .chat-content {
    flex: 1;
  }
}
</style>