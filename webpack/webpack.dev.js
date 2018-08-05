const path = require('path');
const merge = require('webpack-merge');

const commonCfg = require('./webpack.common');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = merge(commonCfg, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      compress: true,
      /*hot: false,
      inline: false*/
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
});
