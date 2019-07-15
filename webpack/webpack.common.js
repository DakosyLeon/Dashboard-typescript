const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const moment = require('moment');
const helpers = require('./helpers');

module.exports = function (basePath, env, config) {
  const mode = env.prod ? 'production' : 'development';
  process.env.NODE_ENV = process.env.ENV = mode;

  return webpackMerge({
    mode: mode,

    entry: {
      'polyfills': 'polyfills.ts',
      'vendor': 'vendor.ts'
    },

    output: {
      publicPath: basePath
    },

    resolve: {
      modules: ['node_modules', 'src/main/ts', 'src/main/scss', 'src/main/assets'],
      extensions: ['.ts', '.tsx', '.js']
    },

    optimization: {
      minimize: env.prod,
      minimizer: [
        new UglifyJsWebpackPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false, // don't show warnings
              drop_console: env.prod // remove console outputs
            }
          }
        })
      ],
      splitChunks: {
        cacheGroups: {
          polyfills: {
            name: 'polyfills',
            test: 'polyfills',
            chunks: 'initial',
            priority: 100,
            reuseExistingChunk: true
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 50,
            reuseExistingChunk: true
          },
          dev: {
            name: 'dev',
            test: 'dev',
            chunks: 'initial',
            priority: 25,
            reuseExistingChunk: true
          },
          main: {
            name: 'main',
            test: 'main',
            priority: -100,
            reuseExistingChunk: true
          }
        }
      }
    },

    module: {
      rules: [{ // loader for typescript
          test: /\.tsx?$/,
          include: helpers.root('src/main/ts'),
          exclude: /(node_modules|bower_components)/,
          loaders: [
            'babel-loader',
            'ts-loader'
          ]
        },
        { // loader for html files
          test: /\.html$/,
          loader: 'html-loader'
        },
        { // loader for manifest files
          test: /\.webmanifest$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].cache.[ext]',
            context: helpers.root('src/main')
          }
        },
        { // loader for images
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].cache.[ext]',
            context: helpers.root('src/main')
          }
        }
        // TODO maybe use 'image-size-loader'
      ]
    },

    plugins: [
      // sets variables for usage in js files
      new webpack.DefinePlugin({
        process: {
          env: {
            BASE_PATH: JSON.stringify(basePath),
            ENV: JSON.stringify(process.env.ENV),
            NODE_ENV: JSON.stringify(process.env.ENV),
            VERSION: JSON.stringify(process.env.npm_package_version),
            BUILD_DATE: JSON.stringify(moment().utc().format())
          }
        }
      }),

      new HtmlWebpackPlugin({
        hash: true,
        template: helpers.root('src/main/html/index.ejs'),
        filename: 'index.html',
        favicon: 'src/main/assets/favicon.ico',
        basePath: basePath,
        chunksSortMode: (a, b) => {
          var order = ['webpack', 'polyfills', 'hmr', 'vendor', 'main'];
          return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
        },
        minify: env.prod && {
          collapseWhitespace: true,
          removeComments: true,
          removeScriptTypeAttributes: true
        }
      })
    ]
  }, config);
};