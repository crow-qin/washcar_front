<template>
  <el-dialog title="添加好友/群聊" :width="410" :model-value="isShow" @update:modelValue="(e) =>changeDialog(e)" @open="handleOpen">
    <el-input v-model="kw" @keydown.enter="handleSearch" clearable/>
    <div class="add-dialog__content">
      <div class="add-dialog__content-item" v-for="v in searchList" :key="v.userId" @click="addFriend(v)">
        <span class="add-dialog__content-item__img">
          <!-- <img :src="v.avatar" alt="" srcset=""> -->
        </span>
        <span class="add-dialog__content-item__name">
          {{ v.account }}
        </span>
        <el-icon><circle-plus/></el-icon>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { searchUser } from '@/business/user';
import { useStore } from 'vuex';

export default {
  props: {
    isShow: {
      default: false,
      type: Boolean,
    },
  },
  emits: [
    'update:isShow'
  ],
  setup(props, content) {
    const store = useStore();
    const data = reactive({
      kw: '',
      searchList: []
    });
    const userId =  store.state.user.userId;
    const handleSearch = async() => {
      if (!data.kw) {
        return;
      }
      const res = await searchUser({ kw: data.kw, userId });
      data.searchList = res || [];
    };

    const addFriend = (user) => {
      store.state.chat.socket.emit('addFriend', { userId, friendId: user.userId});
    };

    const handleOpen = () => {
      data.kw = '';
    };
    const changeDialog = (flag) => {
      content.emit('update:isShow', flag);
    };
    return {
      ...toRefs(data),
      handleSearch,
      addFriend,
      handleOpen,
      changeDialog,
    };
  },
};
</script>

<style lang="scss">
.chat {
  .el-dialog {
    border-radius: 8px;
    .el-dialog__body {
      padding-top: 0px;
    }
  }
  .add-dialog__content {
    max-height: 160px;
    overflow: auto;
    .add-dialog__content-item {
      height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .add-dialog__content-item__img {
        margin-right: 4px;
        width: 36px;
        height: 36px;
        overflow: hidden;
        border-radius: 18px;
        background: rgba(220,220,220,.6);
      }
      img {
        object-fit: cover;
      }
      .add-dialog__content-item__name {
        flex: 1;
      }
      .el-icon {
        font-size: 20px;
      }
    }
  }


}
</style>