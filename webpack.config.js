const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'example'),
    },
    compress: true,
    port: 3002,
    hot: true,
  },
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  module:{
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { "targets": "> 0.25%, not dead" }]
            ]
          }
        }
      },
    ]
  },
  plugins: [
    new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    })
  ]
};