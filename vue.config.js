const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    pages: {
        index: {
          // page 的入口
          entry: 'src/main.ts',
          // 基础URL
          publicPath: '/',
          // 模板来源
          template: 'src/template/index.html',
          title: 'ikenLab - 技术宅实验室'
        }
    },
    devServer: {
      disableHostCheck: true,
      port: 8080,
      proxy: {
        '/post': {
          target: 'http://localhost:9000/',
          changeOrigin: true,
          pathRewrite:{
            '^/post':'/'
          },
        },
        '/': {
          target: 'http://localhost:9000/',
          changeOrigin: true,
          pathRewrite:{
            '^/':'/'
          },
        },
      },
    },
    configureWebpack: config => {
      // 开发环境不需要gzip
      if (process.env.NODE_ENV !== 'production') return
      config.plugins.push(
        new CompressionWebpackPlugin({
          // 正在匹配需要压缩的文件后缀
          test: /\.(js|css|svg|woff|ttf|json|html)$/,
          // 大于10kb的会压缩
          threshold: 10240
          // 其余配置查看compression-webpack-plugin
        })
      )
    }
}