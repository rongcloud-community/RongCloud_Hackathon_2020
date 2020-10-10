module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_HOST
      }
    }
  },
  configureWebpack: {
    entry: {
      app: './src/js/app.js'
    },
    resolve: {
      alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        api: '@/js/api',
        models: '@/models'
      }
    }
  }
}
