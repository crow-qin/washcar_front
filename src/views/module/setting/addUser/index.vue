<template>
  <div class="login-box__user">
      <div>账号：</div>
      <input type="text" v-model="user">
    </div>
    <!-- 插槽使用属性  -->
    <slot name="default" :tip="userTip"></slot>
    <div class="login-box__password">
      <div>密码：</div>
      <input type="text" v-model="password">
    </div>
    <button @click="submit">提交</button>
</template>

<script>
import { ref } from 'vue';
import { addUser } from "@/business/login";
export default {
  name: 'add-user',
  setup(props, context) {
    const user = ref('');

    const password = ref('');
    const submit = async() => {
      if (user.value && password.value) {
        const res = await addUser({account: user.value, password: password.value});
        console.log('test-res', res);
      }
    };

    return {
      user,
      password,
      submit,
    };
  }
};
</script>

<style>

</style>