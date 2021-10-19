<template>
  <div class="member-recharge scroll-page-reset">
    <div class="member-recharge__search mb-20">
      <el-input
        placeholder="根据手机或用户名搜索用户"
        v-model="iptText"
        size="small"
        clearable>
      </el-input>
      <div class="member-recharge__search__result">
        <el-link href="#" :underline="false" class="member-recharge__search__result__item" v-for="v in searchList" :key="v.id" @click="selectMember(v)"> 
          <div>{{v.phone}}</div>
          <div>{{v.name}}</div>
        </el-link>
        <div v-if="iptText && searchList.length == 0">
          搜索不到该会员
          <add-member></add-member>
        </div>
      </div>
    </div>
    <cm-form
      ref="consumptionForm"
      :model="form"
      class="member-recharge__form"
      label-width="100px"
      label-suffix=":">
      <cm-form-title title="消费"></cm-form-title>
      <cm-form-item
        prop="memberId"
        label="消费会员"
        :rules="validator.required('请选择会员进行消费').generate()">
        {{currentMember.data ? currentMember.data.name || currentMember.data.phone : '请选择'}}
      </cm-form-item>
      <cm-form-item
        label="剩余金额"
        class="member-recharge__form__remaining">
        <div class="member-recharge__form__remaining__content">
          <span v-if="currentMember.data">{{ currentMember.data.recharge - currentMember.data.consumption }}元</span>
          <span v-if="rechargeTip">余额不足以抵扣，</span>
          <el-button v-if="rechargeTip" type="text" @click="openPage">去充值</el-button>
        </div>
      </cm-form-item>
      <cm-form-item
        :rules="validator.required().generate()"
        prop="serviceTypes"
        label="服务类型">
        <cm-select
          :options="serviceTypeList"
          tag="typeName"
          code="type"
          size="small"
          multiple
          collapse-tags
          v-model="form.serviceTypes">
          <!-- v-slot:default 简写 #default -->
          <template v-slot:option="{options, code, tag}">
            <el-option v-for="v in options" :key="v[code]"
            :label="v[tag]"
            :value="v[code]">
            <div class="d-flex member-recharge-serviceTypes__item">
              <span>{{v[tag]}}</span>
              <span>￥{{v.typePrice}}</span>
            </div>
            </el-option>
          </template>
          </cm-select>
      </cm-form-item>
      <cm-form-item
        prop="carSize"
        :rules="validator.required().generate()"
        label="车辆类型">
        <cm-select
          :options="carSizeList.carSizeList"
          tag="carSizeName"
          code="carSizeType"
          size="small"
          v-model="form.carSize"></cm-select>
      </cm-form-item>
      <cm-form-item
        prop="consumptionGold"
        label="消费金额"
        :rules="validator.required().float(2).generate()">
        <el-input
          v-model="form.consumptionGold"
          size="small">
          <template v-slot:prepend>￥</template>
        </el-input>
      </cm-form-item>
      <cm-form-item
        prop="consumptionMask"
        label="备注">
        <el-input 
          v-model="form.consumptionMask"
          type="textarea"
          :rows="3"
          :maxlength="50"
          resize="none"
          show-word-limit></el-input>
      </cm-form-item>
    </cm-form>
  </div>
  <div class="member-recharge__footer">
    <el-button type="primary" size="small" @click="handleConfirm" collapse-tags>确认</el-button>
  </div>
</template>

<script>
import { computed, inject, reactive, ref, watch } from 'vue';
import validatorMixins from '@/mixins/validator.mixins.js';
import addMember from '../components/add-member.vue';
import RouterEnums from '@/enums/router.enums.js';
import { useRouter } from 'vue-router';

export default {
  name: RouterEnums.MEMBER_CONSUMPTION,
  mixins: [validatorMixins],
  components: {
    addMember,
  },
  setup() {
    const memberMock = inject('memberMock');
    const iptText = ref('');
    watch(() => iptText.value, (n) => {
      if (n) {
        searchList.value = memberMock.filterMember(n);
      }
    });
    const searchList = ref([]);
    const currentMember = reactive({data: null});
    
    const serviceTypeList = ref([
      {
        type: 's1',
        typeName: '类型1',
        typePrice: 100
      },
      {
        type: 's2',
        typeName: '类型2',
        typePrice: 302
      },
    ]);
    const carSizeList = inject('carSizeList');
    const form = reactive({
      consumptionGold: '',
      memberId: '',
      serviceTypes: [],
      carSize: '',
      consumptionMask: '',
    });
    // 修改服务类型，车辆类型，消费金额也跟着改变
    watch([() => form.serviceTypes, () => form.carSize], ([n1, n2]) => {
      if (n1.length == 0 || n2 === '') {
        form.consumptionGold = '0.00';
        return;
      }
      const priceSum = serviceTypeList.value.reduce((pre, now) => {
        if (n1.find(v => v === now.type)) {
          return pre + now.typePrice;
        }
        return pre;
      }, 0);
      const rate = carSizeList.carSizeList.filter(v => v.carSizeType === n2)[0].carSizeRate;
      form.consumptionGold = (rate * priceSum).toFixed(2);
    });
    const selectMember = item => {
      currentMember.data = item;
      form.memberId = item.memberId;
    };
    const consumptionForm = ref(null);
    const handleConfirm = () => {
      consumptionForm.value.validate(valid => {
        if (!valid) return;
        console.log('test-form', form);
      });
    };
    const router = useRouter();
    const openPage = () => {
      router.push({ name: RouterEnums.MEMBER_RECHARGE, params: { currentMember }});
    };
    const rechargeTip = computed(() => {
      return currentMember.data && currentMember.data.recharge - currentMember.data.consumption < parseFloat(form.consumptionGold);
    });
    return {
      iptText,
      searchList,
      currentMember,
      serviceTypeList,
      carSizeList,
      form,
      selectMember,
      consumptionForm,
      handleConfirm,
      openPage,
      rechargeTip,
      memberMock,
    };
  },
};
</script>

<style lang="scss">
.member-recharge {
  .member-recharge__search, .member-recharge__form {
    padding: 20px;
    background-color: $color-f;
    border-radius: 12px;
  }
  .member-recharge__search {
    .el-input {
      width: 400px;
    }
  }
  .member-recharge__search__result {
    width: 400px;
    margin-top: 20px;
    font-size: 14px;
    color: $color-3;
    max-height: 168px;
    overflow: auto;
    .member-recharge__search__result__item {
      display: block;
    }
    .member-recharge__search__result__item .el-link--inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 32px;
    }
  }
  .member-recharge__form {
    .el-input, .member-recharge__form__remaining__content, .el-textarea {
      width: 300px;
    }
  }
  .member-recharge__form__remaining__content {
    display: flex;
    height: 32px;
    align-items: center;
    >span:first-child {
      flex: 1;
    }
  }
}
.el-select-dropdown__item .member-recharge-serviceTypes__item {
  position: relative;
  justify-content: space-between;
  span:last-child {
    font-size: 12px;
  }
}
.el-select-dropdown__item::after {
  top: 0;
}
.member-recharge__footer {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  background: $color-f;
}
</style>
