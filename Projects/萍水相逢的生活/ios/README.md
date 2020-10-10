# 场信 [iOS]

## 打开项目

在当前目录执行：

```bash
$ pod install
```

然后在 XCode 中打开 `./WebViewInterop.xcworkspace` 目录。

## 安装到真机

打开项目文件，配置如下：

1. 添加 Team：`Signing & Capability` -> `Signing` -> `Team`.
2. 让 Bundle Indentifier 唯一：`Signing & Capability` -> `Signing` -> `Bundle Indentifier`.
3. 选择目标版本：`General` -> `Deployment Info`.

## 配置环境变量

WebView 默认打开 `https://yet.run:8000?platform=ios`，如果需要配置这一行为，需要在 XCode 中打开菜单 `Product` -> `Scheme` -> `Edit Scheme`，选择 `Run` 界面，添加环境变量如：

```
APP_WEBVIEW_URL: http://192.168.0.105:8080?platform=ios
```


