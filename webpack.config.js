// Require plugins and tools
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require("babili-webpack-plugin")
const LicenseWebpackPlugin = require('license-webpack-plugin')
const DotEnv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'scripts.min.js'
  },
  module: {
    rules: [
      // JS
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            'babel-loader',
            'eslint-loader'
        ]
      },
      // Styles
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
      hash: true
    }),
    new ExtractTextPlugin('style.css'),
    new BabiliPlugin(),
    new LicenseWebpackPlugin({
      pattern: /^(MIT|ISC|BSD.*)$/,
      unacceptablePattern: /GPL/,
      abortOnUnacceptableLicense: true
    }),
    new DotEnv({
      path: './.env', // if not simply .env
      safe: true // lets load the .env.example file as well
    })
  ],
  devServer: {
    contentBase: path.resolve('dist'),
    host: process.env.DEVSERVER_HOST,
    compress: process.env.DEVSERVER_COMPRESSION,
    port: process.env.DEVSERVER_PORT,
    https: process.env.DEVSERVER_SSL
  }
}
