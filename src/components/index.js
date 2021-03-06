export default (app) => {
  // 全局组件注册
  // vue3 取消的Vue.component 注册全局组件的方式
  // vue3 增加了vue.defined
  // app是createApp的实例

  const requireComponent = require.context(
    // 其组件目录的相对路径
    '@/components',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /index\.(vue)$/
  );
  requireComponent.keys().map(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);
  
    const componentName = (componentConfig.default || componentConfig).name;
  
    // 全局注册组件
    app.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    );
  });
};
