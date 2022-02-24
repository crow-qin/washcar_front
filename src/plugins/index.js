const requireAll = (requireContext, fn) => requireContext.keys().map(fn);
const req = require.context('./', true, /plugin\.js$/);

export default (app) => {
  requireAll(req, v => {
    if (typeof v == 'Function') {
      return v(app);
    } else {
      return v;
    }
  });
};
