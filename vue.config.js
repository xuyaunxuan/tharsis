module.exports = {
    pages: {
        index: {
          // page 的入口
          entry: 'src/main.ts',
          // 基础URL
          publicPath: '/',
          // 模板来源
          template: 'src/template/index.html',
          title: 'Index Page'
        }
    }
}