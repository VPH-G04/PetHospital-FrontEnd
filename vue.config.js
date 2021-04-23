module.exports = {
  devServer: {
    overlay: {
      warnings: false, //不显示警告
      errors: false //不显示错误
    },
    proxy:{
      '/api':{
        // target: 'http://localhost:8888',
        target: 'http://47.117.135.149:8888',
        pathRewrite:{
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: false //关闭eslint检查
};
