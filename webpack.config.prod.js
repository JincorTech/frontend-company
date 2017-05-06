var path = require('path')
var webpack = require('webpack')
// Plugins
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var WebpackMd5Hash = require('webpack-md5-hash')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// Postcss
var postcssNext = require('postcss-cssnext')
var postcssAssets = require('postcss-assets')
var stylelint = require('stylelint')
var doiuse = require('doiuse')
var reporter = require('postcss-reporter')
var use = require('postcss-use')


module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.ts', '.tsx']
  },
  debug: true,
  devtool: 'inline-source-map',
  noInfo: true,
  entry: ['babel-polyfill', path.resolve('./src/index')],
  target: 'web',
  output: {
    path: path.resolve('./nginx/dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_PREFIX: JSON.stringify(process.env.API_PREFIX || ''),
        API_HOST: JSON.stringify(process.env.API_HOST || ''),
        __DEV__: false
      }
    }),
    new ExtractTextPlugin('[name].[contenthash].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      template: 'src/assets/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      { from: 'src/locales', to: 'locales'}
    ])
  ],
  module: {
    preLoaders: [
      {test: /\.tsx?$/, loader: 'tslint'}
    ],
    loaders: [
      {test: /\.tsx?$/, exclude: /node_modules/, loader: 'awesome-typescript'},
      {test: /\.css$/, include: /src\/(containers|components)/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]', 'postcss-loader'])},
      {test: /\.css$/, exclude: /src\/(containers|components)/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.html$/, exclude: /node_modules/, loader: 'html'},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'}
    ]
  },

  tslint: {
    emitErrors: false,
    failOnHint: false
  },

  postcss: () => [
    stylelint(),
    use({
      modules: [
        'postcss-property-lookup',
        'postcss-will-change',
        'postcss-short',
        'postcss-inline-svg',
        'postcss-center',
        'postcss-clearfix',
        'postcss-triangle',
        'postcss-autoreset',
        'postcss-initial',
        'postcss-for',
        'postcss-calc'
      ]
    }),
    postcssNext(),
    postcssAssets({
      relative: true
    }),
    doiuse({
      browsers: ['ie >= 10', '> 5%'],
      ignore: ['css-transitions', 'calc', 'css3-cursors', 'css-gradients', 'transforms3d']
    }),
    reporter({
      clearAllMessages: true
    })
  ]
};
