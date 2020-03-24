const {
    override,
    addLessLoader,
    overrideDevServer,
    watchAll
} = require("customize-cra");

const devServerConfig = () => config => {
    return {
        ...config,
        proxy: {
            '/api': {
                target: process.env.PROXY || 'http://localhost:8080'
            },
            '/local': {
                target: process.env.PROXY || 'http://localhost:8080',
            },
        },
    }
};

module.exports = {
    webpack: override(
        // usual webpack plugin
        addLessLoader()
    ),
    devServer: overrideDevServer(
        devServerConfig()
    )
};
