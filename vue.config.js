module.exports = {
    pages: {
        index: {
          // page 的入口
          entry: 'src/main.ts',
          // 基础URL
          publicPath: '/',
          // 模板来源
          template: 'src/template/index.html',
          title: 'ikenLab - 知识分享，自由写作'
        }
    },
    devServer: {
      disableHostCheck: true,
      port: 8080,
      proxy: {
        '/': {
          target: 'http://localhost:9000/',
          changeOrigin: true,
          pathRewrite:{
            '^/':'/'
        }
        },
      },
    },
}