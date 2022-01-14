<template>
  <div class="header">
    <div>
      管理系统
    </div>
    <el-dropdown class="header-user">
      <span class="el-dropdown-link">
        {{ user.nickname || user.account }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template v-slot:dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import RouterEnums from '@/enums/router.enums.js';
import { clearCookies } from '@/utils/auth.util';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'cm-header',
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.state.user);
    const logout = () => {
      clearCookies();
      router.replace({ name: RouterEnums.LOGIN});
    };
    return {
      logout,
      user
    };
  }
};
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-user {
    cursor: pointer;
  }
}
</style>
