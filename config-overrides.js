const webpack    = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config) {
    let fallback = config.resolve.fallback || {};

    // These fallbacks are required for the @aztec/sdk v2.1.0-testnet.30 or greater
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "path"  : require.resolve("path-browserify"),
        "assert": require.resolve("assert"),
        "http"  : require.resolve("stream-http"),
        "https" : require.resolve("https-browserify"),
        "os"    : require.resolve("os-browserify"),
        "url"   : require.resolve("url"),
        "fs"    : require.resolve("browserify-fs")
    });

    let plugins = [
        // Only required for @aztec/sdk v2.1.0-testnet.30 or greater, not for v2.0.112
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer : ['buffer', 'Buffer']
        }),
        
        new CopyPlugin({
            patterns: [
                {
                    from: './node_modules/@aztec/**/barretenberg.wasm',
                    to  : '[name][ext]',
                },
                {
                    from: './node_modules/@aztec/**/worker.js',
                    to  : '[name][ext]',
                }
            ],
        })
    ];

    config.resolve.fallback = fallback;
    config.plugins          = (config.plugins || []).concat(plugins);
    config.ignoreWarnings   = [/Failed to parse source map/];

    return config;
}