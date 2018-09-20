var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/react');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/index')

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    /*headers: {
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
     },*/
    historyApiFallback: true,
    disableHostCheck:true,
    hot: true,
    inline: true,
    contentBase: './webapp/build',
    progress: true,
    port: 1120,
    // proxy: {
    //   '\*': {
       
    //   // target: 'http://192.168.16.123:8085',
    //    target: 'http://192.168.16.98:8082',
    //   // target: ' http://192.168.1.104:8080',
    //    // secure: false
    //   }
    //  } 
  },

  entry: [
    'webpack-dev-server/client?http://localhost:1120',
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'react/main.js')
  ],
  output: {
    path: __dirname + '/webapp/build',
    publicPath: '/build',
    filename: './bundle.js',
    chunkFilename: "[id].bundle.js"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, 'react'),
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader?cacheDirectory'],
        noParse: [pathToReact, pathToReactDOM]
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader'
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      loader: 'url'
    },{
      test: /\.less$/,
      loader: 'style!css!postcss!less?{modifyVars:{"@primary-color":"#762b24"}}'//主题颜色
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:1120/dev/index.html'
    })
  ]
};