const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

const BASE_PATH = '/';
const OUTPUT_PATH = helpers.root('/dist');
const DEFAULT_ENV = {
  prod: false,
  hot: false
}

module.exports = function (env = DEFAULT_ENV) {
  const newEnv = Object.assign(DEFAULT_ENV, env);
  const config = {

    entry: {
      'main': 'main.prod.tsx'
    },

    // source-maps waste time, currently no need for production
    // devtool: 'source-map',
    devtool: false,

    // using hashes and '.cache' for caching in browser/proxy
    output: {
      path: OUTPUT_PATH,
      filename: '[name].[contenthash].cache.js',
      chunkFilename: '[name].chunk-[id].[contenthash].cache.js'
    },

    externals: {
      config: 'infr8_config'
    },

    module: {
      rules: [{ // loader for sass
        test: /\.(s?)css$/,
        loader: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    autoprefixer: {},
                    cssnano: {}
                  }
                }
              }
            },
            'sass-loader'
          ]
        })
      }]
    },

    plugins: [
      // do not emit files when there are errors
      new webpack.NoEmitOnErrorsPlugin(),

      // clean output folder before build
      new CleanWebpackPlugin(
        OUTPUT_PATH + '/*', {
          root: helpers.root('.')
        }
      ),

      new webpack.HashedModuleIdsPlugin(),

      // set the filename for extracted css
      new ExtractTextPlugin('assets/[name].[md5:contenthash:hex:20].cache.css'),

      new HtmlWebpackIncludeAssetsPlugin({
        assets: ['config.js'],
        append: false,
        publicPath: true
      }),

      // OfflinePlugin is not required
      // new OfflinePlugin({
      //   version: '[hash]',
      //   responseStrategy: 'network-first',
      //   autoUpdate: true, // TODO: put update into heartbeat
      //   updateStrategy: 'changed',
      //   excludes: ['**/*.cache.js', '**/*.cache.css'],
      //   caches: {
      //     main: [BASE_PATH],
      //     additional: [':externals:', ':rest:']
      //   },
      //   ServiceWorker: {
      //     publicPath: BASE_PATH + 'sw.js',
      //     navigateFallbackURL: BASE_PATH
      //   },
      //   AppCache: {
      //     publicPath: BASE_PATH + 'appcache',
      //     caches: ['main', 'additional', 'optional']
      //   },
      //   cacheMaps: [{
      //     match: /\/app(\/.*)?/,
      //     to: '/'
      //   }]
      // }),
    ]

  };

  return commonConfig(BASE_PATH, newEnv, config);
}