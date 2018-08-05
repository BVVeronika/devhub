const path = require('path');
const merge = require('webpack-merge');

const commonCfg = require('./webpack.common');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(commonCfg, {
    mode: 'production',
    resolveLoader: {
        moduleExtensions: ['-loader']
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader: 'css',
                        options: {minimize: true}
                    },
                    {
                        loader: 'postcss',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ]
                        }
                    },
                    'sass'
                ]
            }
        ]
    },

    // Load plugins.
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                keep_fnames: true,
                keep_classnames: true
            }
        })
    ]
});
