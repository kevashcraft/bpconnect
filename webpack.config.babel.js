import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

module.exports = {
  entry: './src/site/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/site'),
    publicPath: '/',
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        use: 'vue-loader'
      }, {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(jpe?g|gif|ttf|woff|woff2|eot)$/i,
        use: 'file-loader?name=[path][name].[ext]'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|semantic)/
      }, {
        test: /\.(png|svg)$/i,
        use: 'url-loader?name=[path][name].[ext]'
      }
    ]
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'src/site/static'),
  //   inline: true,
  //   historyApiFallback: true,
  //   host: '0.0.0.0',
  //   hot: true
  // },
  plugins: [
    new webpack.ProvidePlugin({
      moment: 'moment',
      jQuery: 'jquery',
      $: 'jquery',
      'window.jQuery': 'jquery',
      jquery: 'jquery',
      'window.jquery': 'jquery',
      'window.$': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: './src/site/index.html'
    }),
    new CopyWebpackPlugin([
      {from: './src/site/static', flatten: true}
    ]),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    alias: {
      'jquery': require.resolve('jquery')
    }
  }
}
