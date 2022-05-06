import {
  Search,
  Goods,
  User,
  Help,
  Suitcase,
  ArrowDown,
  CirclePlus,
} from '@element-plus/icons-vue';

export default (app) => {
  const icons = {
    Search,
    Goods,
    User,
    Help,
    Suitcase,
    ArrowDown,
    CirclePlus,
  };
  Object.keys(icons).map(v => {
    app.component(
      v, icons[v]
    );
  });
};
