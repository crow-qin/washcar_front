import {
  Search,
  Goods,
  User,
  Help,
  Suitcase,
  ArrowDown,
 } from '@element-plus/icons-vue';

export default (app) => {
  const icons = {
    Search,
    Goods,
    User,
    Help,
    Suitcase,
    ArrowDown,
  };
  Object.keys(icons).map(v => {
    app.component(
      v, icons[v]
    );
  });
};
