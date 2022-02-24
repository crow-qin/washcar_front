import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 全局注册组件
import componentFn from './components/index';
import icons from './plugins/icons/plugin';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 国际化
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/es/locale/lang/zh-cn';
import '@/styles/index.js';
// import plugins from './plugins';

const app = createApp(App);
// 全局组件注册
componentFn(app);
icons(app);
// plugins(app)

app.use(router).use(store).use(ElementPlus, { locale }).mount('#app');
