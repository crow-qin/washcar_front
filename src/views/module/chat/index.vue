<template>
  <div class="chat scroll-page-reset">
    <div class="chat-part part-reset">
      <div class="chart-part__top">
        <el-input class="chat-part__top__search" v-model="kw"></el-input>
        <el-dropdown>

          <el-icon><circle-plus/></el-icon>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="openAdd">添加好友/群聊</el-dropdown-item>
              <el-dropdown-item>选择好友创建群聊</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <div v-for="(v, i) in friendsList" :key="i" class="friend-item" @click="openDetail(v)">
          <div>{{ v.account }}</div>
        </div>
      </div>
    </div>
    <add-dialog v-model:isShow="showAddDiag"/>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import addDialog from './components/add-dialog.vue';

export default {
  name: 'chat',
  components: {
    addDialog,
  },
  setup() {
    const kw = ref('');
    const store = useStore();

    const showAddDiag = ref(false);
    const openAdd = () => {
      showAddDiag.value = true;
    };
    const friendsList = computed(() => store.state.chat.friendsInfo);
    watch(() => friendsList, (v) => {
      console.log('test-v', v)
    })
    const initial = async() => {
      // let {chat} = store.state;
      // if (chat.socket) return;
      store.dispatch('chat/connectSocket');

      store.dispatch('chat/getFriendsList');
    };
    const openDetail = (obj) => {
      console.log('test-obj', obj)
    }

    onMounted(() => {
      initial();
    });
    return {
      kw,
      friendsList,
      openAdd,
      showAddDiag,
      openDetail,
    };
  }
};
</script>

<style lang="scss">
.chat {
  display: flex;
  flex-direction: row;
  height: 100%;
  box-sizing: border-box;
  .chat-part {
    background: #fff;
    min-width: 200px;
    width: 20%;
    .chart-part__top {
      display: flex;
      align-items: center;
    }
    .chat-part__top__search {
      width: calc(100% - 28px);
    }
    .el-icon {
      font-size: 20px;
      padding-left: 8px;
      cursor: pointer;
    }
    .friend-item {
      height: 44px;
      cursor: pointer;
      &:hover {
        background: rgba(211,211,211,0.9);
      }
    }
  }
  .chat-content {
    flex: 1;
  }
}
</style>