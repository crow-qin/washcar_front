<template>
<div class="add-member">
  <el-dialog
    title="新增会员"
    v-model="showAddMember"
    width="540px">
    <cm-form
      ref="addMemberForm"
      :model="form"
      label-width="80px"
      label-suffix=":">
      <cm-form-item
        prop="name"
        :rules="validator.required().generate()"
        label="姓名">
        <el-input size="small" v-model="form.name"></el-input>
      </cm-form-item>
      <cm-form-item
        prop="phone"
        :rules="validator.required().phone().generate()"
        label="手机号">
        <el-input size="small" v-model="form.phone"></el-input>
      </cm-form-item>
    </cm-form>
    <template v-slot:footer>
      <el-button type="primary" size="medium" @click="handleConfirm">
        确定
      </el-button>
      <el-button @click="handleCancel">
        取消
      </el-button>
    </template>
  </el-dialog>
  <!-- <slot name="btn"> -->
  <el-button type="text" @click="handleShowAddMember(true)">{{btnText}}</el-button>
  <!-- </slot> -->
</div>
</template>

<script>
import { reactive, ref } from 'vue';
import validatorMixins from '@/mixins/validator.mixins.js';

export default {
  name: 'add-member',
  mixins: [validatorMixins],
  props: {
    btnText: {
      type: String,
      default: '新增会员',
    },
  },
  setup() {
    const showAddMember = ref(false);
    const handleShowAddMember = (flag) => {
      showAddMember.value = flag;
    };

    const form = reactive({
      name: '',
      phone: '',
    });
    const addMemberForm = ref(null);
    const handleCancel= () => {
      handleShowAddMember(false);
      addMemberForm.value.clearValidate();
      form.name = '';
      form.phone = '';
    };
    const handleConfirm = () => {
      addMemberForm.value.validate(valid => {
        // console.log('test-valid', valid);
      });
    };

    return {
      showAddMember,
      handleShowAddMember,
      form,
      addMemberForm,
      handleCancel,
      handleConfirm,
    };
  }
};
</script>

<style lang="scss">
.add-member {
  display: inline-block;
}
</style>
