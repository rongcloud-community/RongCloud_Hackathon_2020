// const path = require('path');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');

// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
module.exports = {
  // parallel: false,
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV !== 'development') {
  //     config.plugins.push(
  //       new PrerenderSPAPlugin({
  //         staticDir: path.join(__dirname, 'dist'),
  //         // 需要进行预渲染的路由路径 我这里做的是首页
  //         routes: ['/', '/about', '/app', '/project'],
  //         // html文件压缩
  //         minify: {
  //           minifyCSS: true, // css压缩
  //           removeComments: true // 移除注释
  //         },
  //         renderer: new Renderer({
  //           // Optional - The name of the property to add to the window object with the contents of `inject`.
  //           // injectProperty: '__PRERENDER_INJECTED',
  //           // headless:false,
  //           // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
  //           // inject: {},
  //           // 在 main.js 中 new Vue({ mounted () {document.dispatchEvent(new Event('pagedata-loaded'))}})，两者的事件名称要对应上。
  //           // renderAfterDocumentEvent: 'pagedata-loaded'
  //           renderAfterTime: 10000
  //         })
  //       })
  //     );
  //   }
  // },
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.ts',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html'
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index');
    config.externals({
      'pixi.js': 'PIXI',
      'dragonBones': 'dragonBones'
      //   vue: 'Vue',
      //   'vue-router': 'VueRouter',
      //   vuex: 'Vuex',
      //   'lz-string': 'LZString',
      //   'vue-meta': 'VueMeta'
      //   // babylonjs: 'BABYLON'
    });
    // config.plugin('prerender').init((Plugin, args) => new Plugin(args))
    // config.plugins.delete('prefetch-waos')
    // config.plugins.delete('prefetch-minieco')
  },
  productionSourceMap: false,
  css: {
    extract: false
  },
  devServer: {
    port: 8000,
    // proxy: {
    //   '^/api': {
    //     // target: 'http://localhost:3000',
    //     target: 'http://localhost',
    //     // target: 'https://www.yuhj.fun',
    //     // ws: true
    //   }
    // }
  },
  pwa: {
    name: ''
  }
};
