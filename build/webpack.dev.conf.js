'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    before:function(app){
      // 完善了get的一部分，需要再调整post
      // 此处使用的是expressjs，参考网址 http://expressjs.com/zh-cn/
      app.all("*",function(req,res,next){
        var proxyUrlArr = ["teachplatform"];  //如果有这个字段，说明已经改为联调接口了
        var isProxy = proxyUrlArr.filter(item => req.path.indexOf(item) !== -1)
        if(req.method.toLowerCase() == "get" && req.path !="/"/*除去根目录*/ && req.originalUrl.indexOf(".") === -1 /*资源文件*/ && isProxy.length < 1){
          res.json(require(path.resolve(__dirname, "../src/data/"+ req.originalUrl+".js")))

        } else if(req.method.toLowerCase() == "post" && isProxy.length < 1){
          var rqjs = require(path.resolve(__dirname, "../src/data/"+ req.originalUrl+".js"))
          var obj =  typeof rqjs === "function" ? rqjs() : rqjs
          obj ? res.json(obj) : next()
        }

        next()
      })
    },
    proxy: {
      // 联调时使用代理，
      // 目标：实现本地需测试与联调地址之间的切换
      '/teachplatform/*': {
        target: 'http://m.zhen.com',
        secure: false, // 接受 运行在 https 上的服务
        changeOrigin: true
      }
    },
    allowedHosts:[
      "javaport.bbtree.com"
    ],
    headers: { "Access-Control-Allow-Credentials":true,"Access-Control-Allow-Origin": "*" },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
