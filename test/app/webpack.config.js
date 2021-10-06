const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ENV = require('../e2e/env');
ENV.config();

const DEV_SERVER_PORT = 3000;

const ENTRIES = [
  'basic-dev',
  'basic',
  'npm',
  'oidc'
];

module.exports = {
  mode: 'development',
  entry: ENTRIES.reduce((acc, curr) => {
    acc[curr] = `./src/${curr}.js`;
    return acc;
  }, {}),
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
  devtool: 'source-map',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
        staticOptions: {
          extensions: ['html']
        }
      },
      {
        directory: path.resolve(__dirname, '..', '..', 'dist')
      }
    ],
    port: DEV_SERVER_PORT,
    headers: {
      'Content-Security-Policy': `script-src 'unsafe-inline' http://localhost:${DEV_SERVER_PORT}`
    }
  },
  plugins: [
    ...ENTRIES.map(entry => new HtmlWebpackPlugin({
      filename: `${entry}.html`,
      template: 'template.html',
      inject: false,
      templateParameters: {
        entry,
      }
    })),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(ENV.getValues())
    })
  ]
}