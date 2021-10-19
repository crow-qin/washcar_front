import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

// 转换路径为camel格式key
// './report/infoquery/index.js -> infoquery
// './report/unreceived-statistics/index.js -> reportUnreceivedStatistics
function transform(request) {
  return request
    .replace('./', '')
    .replace('/index.js', '')
    .replace(/(\/(\w)|-(\w))/g, (m, $1, $2, $3) => ($2 || $3).toUpperCase());
}

function requestAll(context, handler) {
  context.keys().map(req => {
    const key = transform(req);
    handler(key, req);
  });
}

const modules = {};
// 加载全部模块，包括懒加载模块
// require.context只能加载文件，所以includeSubdirs参数需要为true
// 通过filter来加载./.*/.*/index.js
// 此种方式会加载到子文件夹模块，需要对key进行处理
const context = require.context('@/store/modules', true, /.*(index\.js)$/);
requestAll(context, (key, req) => (modules[key] = context(req).default));

// console.log('test-modules', modules);
export default Vuex.createStore({
  state: {
    // token
    token: '',
    user: {},
  },
  mutations,
  actions,
  modules
});
