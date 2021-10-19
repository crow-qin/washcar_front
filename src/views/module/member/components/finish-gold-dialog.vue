<template>
  <el-dialog
    width="400px"
    :model-value="value"
    @close="handleClose"
    :title="title">
    <div class="d-flex finish-gold-dialog__content">
      <span>会员已{{ Number(rechargeGold) > 0 ? '充值' : '消费' }} <i class="price">{{ Number(rechargeGold) > 0 ? rechargeGold : consumptionGold }}</i> 元</span>
      <span>剩余金额为 <i class="price">{{ remaining }}</i> 元</span>
    </div>
    <template v-slot:footer>
      <el-button size="small" type="primary"  @click="openPage">去消费</el-button>
      <el-button size="small" @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  props: {
    value: Boolean,
    title: {
      type: String,
      default: '充值成功',
    },
    rechargeGold: {
      type: [String, Number],
      default: 0,
    },
    consumptionGold: {
      type: [String, Number],
      default: 0,
    },
    remaining: {
      type: [String, Number],
      default: 0,
    }
  },
  // 存在emit必须增加emits
  emits: [
    'openPage',
    'update:value'
  ],
  setup(props, { emit }) {
    const openPage = () => {
      emit('openPage');
    };

    const handleClose = () => {
      emit('update:value', false);
      console.log('test-value', props.value);
    };
    return {
      openPage,
      handleClose,
    };
  }
};
</script>

<style lang="scss">
.finish-gold-dialog {
  &__content {
    flex-direction: column;
    padding-left: 20px;
    color: $color-3;
    >span {
      line-height: 28px;
    }
    .price {
      color: #f56c6c;
    }

  }
}
</style>
