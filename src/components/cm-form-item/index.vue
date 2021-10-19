<template>
  <!-- 这样写容易混 如果是属性名相同 两个都会添加 -->
  <el-col class="cm-form-item" v-bind="{...$props, ...$attrs}">
    <el-form-item v-bind="{...$props, ...$attrs}">
      <slot/>
    </el-form-item>
  </el-col>
</template>

<script>
import { ElCol, ElFormItem } from 'element-plus';

export default {
  name: 'cm-form-item',
  props: {
    ...ElCol.props,
    ...ElFormItem.props,
  },
  setup() {
    
  }
};
</script>

<style lang="scss">
.cm-form-item {
  .el-form-item__label,
  .el-form-item__content {
    line-height: 32px;
  }
}
</style>
