const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

const BASE_PATH = '/';
const DEFAULT_ENV = {
  prod: false,
  hot: false
}

module.exports = function (env = {}) {
  const newEnv = Object.assign(DEFAULT_ENV, env);
  const config = {

    entry: {
      'dev': newEnv.hot ? ['react-hot-loader/patch'] : ['react-hot-loader'],
      'main': 'main.dev.tsx'
    },

    // source-maps will break in hmr (hot) after change
    // -> press 'alt + r' in chrome devtools to refresh sources
    // -> refresh page for visual studio code to pick up changes
    //
    // 'cheap-module-eval-source-map' is faster, but does not work for Sass (.scss)
    //
    // docs: https://webpack.github.io/docs/configuration.html#devtool
    devtool: 'cheap-module-source-map',

    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk-[id].js'
    },

    module: {
      rules: [{ // css-hot-loader fix 
          test: /index\.tsx$/,
          exclude: /node_modules/,
          loaders: ['css-hot-loader']
        },
        { // loader for sass
          test: /\.(s?)css$/,
          loaders: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            use: [{
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    ctx: {
                      autoprefixer: {}
                    }
                  },
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }))
        }
      ]
    },

    plugins: [
      // display building progress in console
      new webpack.ProgressPlugin(),

      // display modules with names instead of ids
      new webpack.NamedModulesPlugin(),

      // set the filename for extracted css
      new ExtractTextPlugin('[name].css')
    ],

    // configure the webpack-dev-server
    devServer: {
      host: 'localhost',
      port: 3000,
      publicPath: BASE_PATH,
      contentBase: helpers.root('/tmp'),
      inline: true,
      hot: newEnv.hot,
      historyApiFallback: true,
      stats: 'minimal'
    }

  };

  if (newEnv.hot) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return commonConfig(BASE_PATH, newEnv, config);
}