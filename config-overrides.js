const { injectBabelPlugin,  } = require('react-app-rewired');

module.exports = function override(config, env) {
  const newConfig = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
  return newConfig;
};