# vue3_demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

=2021=
==d7--0207==
提供，注入
provide, inject
适用深度嵌套的组件
父组件使用provider提供数据
子组件使用inject使用数据

provide inject需要写在setup中

提供非组件内的数据(一般是静态字符串或数字)，
父组件
import { provide } from 'vue';
export default {
  setup() {
    provide('number', 1);
  }
}

子组件
import { inject } from 'vue';
export default {
  setup() {
    const number = inject('number');
    return {
      number
    }
  }
}

提供组件内响应式的数据
父组件
import { provide, ref } from 'vue';
export default {
  setup() {
    const number = ref(1);
    provide('number', number);
    return {
      number,
    };
  }
}

子组件
import { inject } from 'vue';
export default {
  setup() {
    const number = inject('number');
    return {
      number,
    };
  }
}

provide还可以提供方法 子组件通过inject使用该方法

单元测试库 Jest Mocha
端到端测试 Cypress.io


const account = new mongoose.Schema({
  <!-- 姓名 -->
  name: {
    type: String,
  },
  <!-- 手机号 -->
  phone: {
    type: String,
  },
  <!-- 充值金额 -->
  recharge: {
    type: Number,
  },
  <!-- 消费金额 -->
  comsumption: {
    type: Number,
  },
  <!-- 注册时间 -->
  time: {
    type: String，
    default: new Date().getTime(),
  },
  <!-- 性别 -->
  gender: {
    type: Boolean,
    <!-- 0: 女，1: 男 -->
  },
  拥有车辆
  carList: {
    type: Array
  }
})
const car = new mongoose.Schema({
  <!-- 车牌 -->
  licensePlate: {
    type: String,
  },
  carType: {
    type: String,
  },
  usedGold: {
    type: Number,
  },
  memberId: {
    type: String,
  },
})
const recharge = new mongoose.Schema({
  time: {
    type: String,
    defalut: new Date().getTime(),
  },
  gold: {
    type: Number,
  },
  memberId: {
    type: String
  },
})
const consumption =  new mongoose.Schema({
  time: {
    type: String,
    defalut: new Date().getTime(),
  },
  gold: {
    type: Number,
  },
  memberId: {
    type: String,
  },
  serviceTypeId: {
    type: String,
  },
  carId: {
    type: String,
  },
})
<!-- 服务类型 -->
const serviceType = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  price: {
    type: double,
  },
})
<!-- 车辆类型 轿车 越野 suv -->
const carSize = new mongoose.Schema({
  carSizeType: {
    type: String,
  },
  carSizeName: {
    type: String,
  },
  carSizeRate: {
    type: float,
  },
})
const account = ref('会员: 用户id，手机号，姓名、姓，已充值金额，已消费金额，办卡时间，性别，已拥有车(arr[string])');
// 会员暂时不增加等级、权限
const car = ref('车: 车牌id，车型，已使用金额，服务类型(arr)');
const recharge = ref('充值记录: 时间，金额，用户id');
const consumption = ref('消费记录: 时间，金额，用户id，车id, 服务类型');
const servicesType = ref('服务类型: 名称，枚举值');
// 30分钟 1小时 30分钟
// 使用provide、inject代替vuex，vue3+ts， axios
// 后端使用koa2+MongoDB
金额 按消费，充值 双折线图
按天数