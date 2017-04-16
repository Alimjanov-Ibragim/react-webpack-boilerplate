// Require plugins and tools
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require("babili-webpack-plugin")
const LicenseWebpackPlugin = require('license-webpack-plugin')

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
    })
  ],
  devServer: {
    contentBase: path.resolve('dist'),
    compress: true,
    port: 8080,
    https: false
  }
}
