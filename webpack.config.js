const path = require('path');
const htmlWebpackPlugin= require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    options: './options/index.js',
    popup: './popup/index.js',
  },
  devtool: 'cheap-eval-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },//出口
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'options/index.html',
      chunks: ['options'],
    }),
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'popup/index.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve("./manifest.json"),
        to: `${path.resolve("dist")}/manifest.json`
      },
      {
        from: path.resolve("./background.js"),
        to: `${path.resolve("dist")}/background.js`
      },
    ]),
  ],
  mode: 'development'//模式
};
