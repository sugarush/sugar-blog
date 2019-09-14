'use strict'

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './src/app.js'
  ],
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.sass$/, use: [ 'vue-style-loader', 'css-loader', { loader: 'sass-loader', options: { indentedSyntax: true } } ] }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'bower_components/semantic/dist/semantic.css',
        to: 'bower_components/semantic/dist/semantic.css'
      }, {
        from: 'bower_components/semantic/dist/themes/default/assets/fonts/icons.woff',
        to: 'bower_components/semantic/dist/themes/default/assets/fonts/icons.woff'
      }, {
        from: 'bower_components/semantic/dist/themes/default/assets/fonts/icons.woff2',
        to: 'bower_components/semantic/dist/themes/default/assets/fonts/icons.woff2'
      }, {
        from: 'bower_components/semantic/dist/themes/default/assets/fonts/icons.ttf',
        to: 'bower_components/semantic/dist/themes/default/assets/fonts/icons.ttf'
      }, {
        from: 'bower_components/github-markdown-css/github-markdown.css',
        to: 'bower_components/github-markdown-css/github-markdown.css'
      }, {
        from: 'bower_components/jquery/dist/jquery.js',
        to: 'bower_components/jquery/dist/jquery.js'
      }, {
        from: 'bower_components/lodash/dist/lodash.js',
        to: 'bower_components/lodash/dist/lodash.js'
      }, {
        from: 'bower_components/semantic/dist/semantic.js',
        to: 'bower_components/semantic/dist/semantic.js'
      }, {
        from: 'bower_components/jwt-decode/build/jwt-decode.js',
        to: 'bower_components/jwt-decode/build/jwt-decode.js'
      }, {
        from: 'bower_components/showdown/dist/showdown.js',
        to: 'bower_components/showdown/dist/showdown.js'
      }, {
        from: 'bower_components/slug/slug.js',
        to: 'bower_components/slug/slug.js'
      }, {
        from: 'static', to: 'static'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}
