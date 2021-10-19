<template>
  <div class="d-flex">count: {{ count }}</div>
  <div>formatCount: {{ formatCount }}</div>
  <button @click="add">加1</button>

  <div>count: {{ count1 }}</div>
  <button @click="sub">减1</button>
  <div v-for="v in community" :key="v.id" :ref="setCommunityRef">{{v.name}}</div>
  <div>{{current.name}}</div>
  <!-- 多个v-model -->
  <cm-input label="名字" v-model:text="name"/>
  <div>{{name}}</div>
  <button @click="openPage">跳转登录</button>
</template>

<script>
import self from './index';

export default {
  name: 'about',
  setup(props, { root }) {
    return self(props, root);
  },
};
</script>

<style>
</style>
