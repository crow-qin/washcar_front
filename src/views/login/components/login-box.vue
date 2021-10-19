<template>
  <div class="login-box">
    <div class="login-box__user">
      <div>账号：</div>
      <input type="text" :value="user" @input="inputUser" @change="changeUser">
    </div>
    <!-- 插槽使用属性  -->
    <slot name="default" :tip="userTip"></slot>
    <div class="login-box__password">
      <div>密码：</div>
      <input type="text" :value="password" @input="inputPassword">
    </div>
  </div>
</template>

<script>
import { inject, ref, watch} from 'vue';

export default {
  name: 'login-box',
  props: [
    'user',
    'password',
    'userModifiers',
  ],
  // 存在emit必须增加emits
  emits: [
    'update:user',
    'update:password',
  ],
  setup(props, context) {
    const inputUser = $event => {
      return context.emit('update:user', $event.target.value);
    }
    const userTip = ref('');
    // props 是响应式的 es6的解构赋值会消除他的响应 可以通过toRef来避免
    // const { user } = toRefs(props);
    watch(() => props.user, n => {
      console.log('test-n', n);
     if (!n) {
        userTip.value = 'user为空';
      } else {
        userTip.value = '';
      }
    })

    const changeUser = $event => {
      console.log('test-change');
      if (props.userModifiers.needSuffix && $event.target.value) {

        return context.emit('update:user', 'user:' + $event.target.value);
      }
      return context.emit('update:user', $event.target.value);
    }
    const inputPassword = $event => {
      return context.emit('update:password', $event.target.value);
    }
    const number = inject('number');
    watch(() => number, n => {
      console.log('test-inject.number', n);
    })
    return {
      inputUser,
      userTip,
      inputPassword,
      changeUser,
      number,
    };
  }
};
</script>

<style lang="scss">
.login-box {
 &__user,
 &__password {
   display: flex;
   align-items: center;
 }
}
</style>
