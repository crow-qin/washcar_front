const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./', true, /plugin\.js$/);
requireAll(req);
