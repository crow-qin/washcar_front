<template>
  <div class="member-recharge scroll-page-reset">
    <!-- <div class="member-recharge__search mb-20">
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
    </div> -->
    <cm-search-user class="member-recharge__search" :currentMember="currentMember" @selectMember="selectMember"/>
    <cm-form
      ref="formR"
      :model="form"
      class="member-recharge__form"
      label-width="100px"
      label-suffix=":">
      <cm-form-title title="充值"/>
      <cm-form-item
        prop="memberId"
        label="充值会员"
        :rules="validator.required().generate()">
        <span v-if="currentMember.data">
          {{currentMember.data.name || currentMember.data.phone}}
          <i class="el-icon-error color-error" @click="cancelMember"></i>
        </span>
        <span v-else>
          请选择
        </span>
      </cm-form-item>
      <cm-form-item
        label="剩余金额">
        <span v-if="currentMember.data">{{ currentMember.data.recharge - currentMember.data.consumption }}元</span>
      </cm-form-item>
      <cm-form-item
        prop="rechargeGold"
        label="充值金额"
        :rules="validator.required().digit().min(0).float(2).generate('blur')">
        <el-input
          v-model="form.rechargeGold"
          size="small">
          <template v-slot:prepend>￥</template>
        </el-input>
      </cm-form-item>
    </cm-form>
    <finish-gold-dialog v-model:value="showFGD" @openPage="openPage"></finish-gold-dialog>
  </div>
  <div class="member-recharge__footer">
    <el-button type="primary" size="small" @click="handleConfirm">确认</el-button>
  </div>
</template>

<script>
import { getCurrentInstance, inject, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import validatorMixins from '@/mixins/validator.mixins.js';
// import addMember from '../components/add-member.vue';
import finishGoldDialog from '../components/finish-gold-dialog.vue';
import RouterEnums from '@/enums/router.enums.js';

export default {
  name: RouterEnums.MEMBER_RECHARGE,
  mixins: [validatorMixins],
  components: {
    // addMember,
    finishGoldDialog,
  },
  setup() {
    // 顶部搜索栏
    const iptText = ref('');
    const memberMock = inject('memberMock');
    watch(() => iptText.value, (n) => {
      if(n) {
        // reactive不能直接赋空值
        searchList.length = 0;
        searchList.splice(0, 0, ...memberMock.filterMember(n));
      } else {
        searchList.length = 0;
      }
    });
    const searchList = reactive([]);
    const currentMember = reactive({data: null});
    watch(() => currentMember.data, (n) => {
      console.log('test-n', n);
    });
    const selectMember = item => {
      currentMember.data = item;
      form.memberId = item.memberId;
    };

    const form = reactive({
      rechargeGold: '',
      memberId: ''
    });
    const instance = getCurrentInstance();
    const formR = ref(null);
    const handleConfirm = () => {
      console.log('test-instance', instance);
      formR.value.validate((err)=> {
        if (!err) {
          return;
        }
        showFGD.value = true;
      });
    };
    const router = useRouter();
    const openPage = () => {
      router.push({ name: RouterEnums.MEMBER_CONSUMPTION });
    };
    const showFGD = ref(false);
    const cancelMember = () => {
      currentMember.data = null;
      form.memberId = null;
      form.rechargeGold = null;
    };

    return {
      iptText,
      searchList,
      currentMember,
      form,
      formR,
      selectMember,
      handleConfirm,
      showFGD,
      openPage,
      cancelMember,
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
    .el-input {
      width: 300px;
    }
  }
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
