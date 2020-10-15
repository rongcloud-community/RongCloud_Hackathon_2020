# f7

## 快速上手

```bash
# 首先u需要安装依赖
yarn

# 开发
yarn serve

## 生产
yarn build
```

## 配置后端 URL

### 开发环境

开发环境使用的是 vue.config.js 的 devServer 配置，后端直接在 localhost:9292 启动服务即可。

### 生产环境

生产环境下需要配置 nginx，配置以下两个代理：

```nginx
location /api {
  proxy_pass 'http://localhost:9292'
}

location / {
  root /path/to/local/project's/dist
}
```

### 配置 API host

另外，API 地址可动态调配，配置环境变量`VUE_APP_API_HOST`即可。

## 浏览器直传的 OSS

在阿里云的 OSS 仓库配置中，打开跨域支持：

> 通过浏览器直接访问OSS时，CORS配置规则要求如下：
> 
>     来源：设置为*。
>     允许 Methods：选中GET、POST、PUT、DELETE以及HEAD。
>     允许 Headers：设置为*。
>     暴露 Headers：设置为ETag以及x-oss-request-id。

## TODO 列表

- [ ] 如何做到从 URL 进入
- [ ] 通过标题区分谁与谁
- [ ] 首次加载时如果有较多图片消息则无法置顶
- [ ] 多端登录的消息方向有问题
