const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: true }], config);
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@brand-primary": "#cc6699" }
    })(config, env);
    return config;
};