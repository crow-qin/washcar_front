<template>
  <el-form
    ref="cmForm"
    class="cm-form"
    v-bind="{...$props, ...$attrs}">
    <el-row v-bind="{...$props}">
      <slot/>
    </el-row>
  </el-form>
</template>
<script>
import { ElForm, ElRow } from 'element-plus';
import { ref } from 'vue';
export default {
  name: 'cm-form',
  props: {
    ...ElForm.$props,
    ...ElRow.$props,
  },
  setup() {
    const cmForm = ref(null);
    const validate = (...args) => {
      cmForm.value.validate(...args);
    };
    const validateField = (...args) => {
      cmForm.value.validateField(...args);
    };
    const resetFields = (...args) => {
      cmForm.value.resetFields(...args);
    };
    const clearValidate = (...args) => {
      cmForm.value.clearValidate(...args);
    };
    return {
      validate,
      validateField,  
      resetFields,
      clearValidate,
      cmForm,
    };
  },
};
</script>