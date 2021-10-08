const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ENV = require('../e2e/env');
ENV.config();

const DEV_SERVER_PORT = 3000;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    alias: {
      '@okta/okta-signin-widget': path.resolve(__dirname, '..', '..', 'dist/js/okta-sign-in.entry.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, '..', '..', 'dist')
      },
      {
        staticOptions: {
          watchContentBase: true
        }
      }
    ],
    port: DEV_SERVER_PORT,
    historyApiFallback: true,
    headers: {
      'Content-Security-Policy': `script-src http://localhost:${DEV_SERVER_PORT}`
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: false,
      // templateParameters: {
      //   OKTA_SIGN_IN: 'js/okta-sign-in.min.js',
      // }
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(ENV.getValues())
    })
  ]
}