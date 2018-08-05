const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpritePlugin = require('svg-sprite-loader/plugin');
const autoprefixer = require('autoprefixer');
const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');

const rootDir = path.resolve('./');
const srcDir = path.resolve('src');
const distDir = path.resolve('docs');
const nodeModules = path.resolve('node_modules');

module.exports = {
    // Entry points.
    entry: {
        app: path.join(srcDir, 'index.js')
    },

    // Output system.
    output: {
        path: distDir,
        filename: '[name].bundle.js',
    },

    node: {
        net: 'empty',
        tls: 'empty',
        fs: "empty"
    },

    resolveLoader: {
        moduleExtensions: ['-loader']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(rootDir, "node_modules"),
                use: {
                    loader: 'babel'
                }
            },
            {
                type: 'javascript/auto',
                test: /\.json/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file?name=assets/js/[name].[ext]'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                        'style',
                        {
                            loader: 'css'
                        }
                    ]
            },
            {
                test: /\.svg$/i,
                exclude: path.resolve(rootDir, "src/assets/fonts"),
                include: path.resolve(rootDir, 'src/assets/svg-inline'),
                use: [
                    {
                        loader: 'file?name=assets/img/svg-inline/[name].[hash].[ext]',
                    },
                    'svgo'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                exclude: rootDir + "src/assets/img",
                use: [{
                    loader: 'url',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: "assets/img/[name].[hash].[ext]",
                        fallback: "file-loader"
                    }
               }]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?v=[\d.]+)?(\?[a-z0-9#-]+)?$/,
                include: path.resolve(rootDir, 'src/assets/fonts'),
                loader: 'file?name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.pug$/,
                exclude: path.resolve(rootDir, "src/views/runtime"),
                use: [{
                        loader: 'html',
                        options: {
                            interpolate: 'require',
                            attrs: ['img:src', 'source:srcset']
                        }
                    },
                    'pug-html'

                ]
            },
            // {
            //     test: /\.pug$/,
            //     include: rootDir + "src/views/runtime",
            //     exclude: rootDir + "src/views",
            //     use: [{
            //         loader: 'pug'
            //     }]
            // },
            {
                test: require.resolve('jquery'),
                use: [
                    'expose-loader?$',
                    'expose-loader?jQuery'
                ]
            },
            {
                test: /\.svg$/,
                exclude: path.resolve(rootDir, "src/assets/fonts"),
                include: path.resolve(rootDir, 'src/assets/svg-sprite'),
                use: [
                    {
                      loader: 'svg-sprite',
                      options: {
                        //extract: true,
                        spriteFilename: 'assets/img/sprite-[hash:6].svg',
                      }
                    },
                    'svgo-loader'
                ]
            }
        ]
    },

    // Load plugins.
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['app'],
            template: './src/index.pug'
        }),
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css'
        }),
        new CopyWebpackPlugin([
            //{ context: 'src/assets', from: '**/*.png', to: 'assets' },
            //{ context: 'src/assets', from: '**/*.jpg', to: 'assets' },
            { context: 'src/assets/svg-inline', from: '**/*.svg', to: 'assets/svg-inline' },
            { context: 'src/assets/video', from: '**/*.mp4', to: 'assets/video' },
            { context: 'src/assets', from: '**/*.ico', to: '' }
        ]),
        new SvgStorePlugin({
            emit: false
        }),
        new SpritePlugin()
    ]
};
