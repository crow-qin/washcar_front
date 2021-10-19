import { provide } from "vue";

export default () => {
  const requireComponent = require.context(
    '@/provide',
    true,
    /provide\.(js)$/
  );
  requireComponent.keys().map(value => {
    const fileValue = requireComponent(value);
    provide(fileValue.default.name, fileValue.default());
  });
};
