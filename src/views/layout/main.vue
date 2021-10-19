<template>
  <el-container class="main">
    <el-header>
      <cm-header></cm-header>
    </el-header>
    <el-container class="main__container">
      <el-aside width="200px">
        <cm-aside/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { provide } from 'vue';
import Aside from './aside.vue';
import Header from './header';
// import currentMember from '@/provide/common/current-member.provide.js';
// import memberMock from '@/provide/common/member-mock.provide.js';
import provideFn from '@/provide/index';
export default {
  name: 'cm-main',
  components: {
    'cm-header': Header,
    'cm-aside': Aside,
  },
  setup() {
    provideFn();
    // provide('currentMember', currentMember());
    // provide('memberMock', memberMock());
  }
};
</script>

<style lang="scss">
.main {
  height: 100%;
  .el-aside>div, .el-aside>div>.el-menu {
    height: 100%;
  }
  .el-main {
    background: $color-f123;
    overflow-y: auto;
    padding: 0;
  }
  .main__container {
    overflow-y: auto;
    position: relative;
  }
}
</style>
