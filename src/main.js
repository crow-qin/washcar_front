import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 全局注册组件
import componentFn from './components/index';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// 国际化
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import '@/styles/index.js';

const app = createApp(App);
// 全局组件注册
componentFn(app);

app.use(router).use(store).use(ElementPlus, { locale }).mount('#app');
