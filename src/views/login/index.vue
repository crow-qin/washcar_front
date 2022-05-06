<template>
  <div class="login-page login-page__img">
    <div class="login-page__box">
      <h1 class="login-page__box__title">会员后台管理系统</h1>
      <form>
        <el-input
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          v-model="user.account"/>
        <el-input
          class="login-page__box__pwd"
          type="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-user"
          v-model="user.password"/>
        </form>
      <el-button type="text" @click="changeType">{{loginType ? '注册账号':'已有账号'}}</el-button>
      <el-button class="login-page__box__btn" type="primary" @click="handleClick">{{loginType ? '登录':'注册'}}</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { register } from '@/business/login';

export default {
  name: 'login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = reactive({
      account: '',
      password: '',
    });
    

    const loginType = ref(true);
    const changeType = () => {
      loginType.value = !loginType.value;
      user.account = '';
      user.password = '';
    };
    const handleRegister = async(data) => {
      const res = await register(data);
    };
    
    const handleClick = async() => {
      // if (user.account === 'admin' && user.password === '123') {
      //   store.commit('setUser', user);
      //   store.commit('setToken', 1);
      //   router.replace({name: 'Home'});
      //   return;
      // }
      try {
        if (user.account && user.password) {
          if (loginType.value) {
            await store.dispatch('login', user);
            router.replace({name: 'Home'});
            return;
          }
          await handleRegister(user);
        }
      } catch (err) {
        console.log(err);
        ElMessage({
          message: err,
          type: 'error',
          center: true
        });
      }
    };

    return {
      user,
      handleClick,
      loginType,
      changeType,
    };
  },
};
</script>

<style lang="scss">
.login-page {
  position: relative;
  width: 100%;
  height: 100%;
  &.login-page__img {
    background-image: linear-gradient(45deg, #efefef 25%,transparent 25%,transparent 75%, #cfcfcf 75%),linear-gradient(135deg,#ececec 25%,transparent 25%,transparent 75%, #e0e0e0 75%);
  }
  .login-page__box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 20px;
    border-radius: 12px;
    // opacity: .8;
    background: rgba(0, 0, 0, .02);
    box-shadow: -4px 4px 10px 2px rgba(0, 0, 0, .3);
    .login-page__box__title {
      color: #333;
      font-size: 24px;
      padding-bottom: 12px;
    }
    .login-page__box__pwd {
      padding: 12px 0;
    }
    .login-page__box__btn {
      width: 100%;
      margin-left: 0px;
    }
  }
}
</style>
