<template>
  <el-select v-model="select" v-bind="$attrs" placeholder="请选择">
    <template v-if="!$slots.option">
      <el-option v-for="v in options" :key="v[code]"
      :label="v[tag]"
      :value="v[code]">
      </el-option>
    </template>
    <template v-else>
      <slot name="option" :options="options" :code="code" :tag="tag"/>
    </template>
  </el-select>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
export default {
  name: 'cm-select',
  props: {
    code: {
      type: String,
      default: 'code'
    },
    // multiple:{
    //   type: Boolean,
    //   default: false,
    // },
    tag: {
      type: String,
      default: 'name',
    },
    options: Array,
    value: {
      type: [String, Number, Array]
    },
  },
  // 存在emit必须增加emits
  emits: ['update:value'],
  setup(props, { emit }) {
    // select的类型是selectValue的类型
    const select = ref(null);
    watch(() => props.value, n => {
      select.value = n;
    });
    watch(()=> select.value, n => {
      emit('update:value', n);
    });

    onMounted(() => {
      select.value = props.value;
    });
    return {
      select,
    };
  }
};
</script>

<style>
</style>
