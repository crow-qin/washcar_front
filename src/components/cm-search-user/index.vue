<template>
  <div class="search-user mb-20">
    <el-input
      placeholder="根据手机或用户名搜索用户"
      v-model="iptText"
      size="small"
      clearable>
    </el-input>
    <div class="search-user__result">
      <el-button :underline="false" class="search-user__result__item" v-for="v in searchList" :key="v.id" @click="selectMember(v)"> 
        <div>{{v.phone}}</div>
        <div>{{v.name}}</div>
      </el-button>
      <div v-if="iptText && searchList.length == 0">
        搜索不到该会员
        <add-member></add-member>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref, watch } from 'vue';
import addMember from '../../components/cm-add-member';

export default {
  name: 'cm-search-user',
  components: {
    addMember,
  },
  props: {
    currentMember: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'update:currentMember'
  ],
  setup(prop, { emit }) {
     // 顶部搜索栏
    const iptText = ref('');
    const memberMock = inject('memberMock');
    watch(() => iptText.value, (n) => {
      if(n) {
        // reactive不能直接赋空值
        searchList.length = 0;
        searchList.splice(0, 0, ...memberMock.filterMember(n));
      } else {
        searchList.length = 0;
      }
    });
    const searchList = reactive([]);
    const selectMember = item => {
      emit('selectMember', item);
      // currentMember.data = item;
    };
    return {
      iptText,
      searchList,
      selectMember,
    };
  }
};
</script>

<style lang="scss">
.search-user {
  // .el-input {
  //   width: 400px;
  //   margin: 20px;
  //   background-color: $color-f;
  //   border-radius: 12px;
  // }
  .search-user__result {
    width: 400px;
    margin-top: 20px;
    font-size: 14px;
    color: $color-3;
    max-height: 168px;
    overflow: auto;
    .search-user__result__item {
      display: block;
    }
    .search-user__result__item .el-link--inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 32px;
    }
  }
}
</style>
