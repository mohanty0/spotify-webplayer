var path = require('path');
const express = require('express')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill','./app/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'index.bundle.js',
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/,
        use: 'babel-loader' , 
        exclude:  /(node_modules)/},
      { 
        test: /\.css$/, 
        use: [ 'style-loader', 
        'css-loader' ]}]
  },
  plugins: [
    new HtmlWebpackPlugin({
          template: 'app/index.html'
      })
    ]
};