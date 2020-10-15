module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index');
    config.externals({
      'pixi.js': 'PIXI',
      'dragonBones': 'dragonBones'
    });
  },
  productionSourceMap: false,
  css: {
    extract: false
  },
  devServer: {
    port: 8000,
  }
};
