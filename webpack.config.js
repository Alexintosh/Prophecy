var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: {
    app: './src/app.js'
  },
  devtool: 'inline-source-map',
  devServer: {
        // hot: true,
        // contentBase: path.resolve(__dirname, 'dist'),
    contentBase: path.resolve(process.cwd(), 'www'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'www']),
    HtmlWebpackPluginConfig
  ],
  module: {
    loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
    ],
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), 'www')
        // path: path.resolve(__dirname, 'dist')
  }
}
