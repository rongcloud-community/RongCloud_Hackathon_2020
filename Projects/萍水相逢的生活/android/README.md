# 场信 [Android]

## 打开项目

在 Android Studio 打开本目录即可。

在开发阶段，应选择 build variant 为 Debug。如果想安装到真机体验，应选择 build variant 为 Release. 两者的区别在于 WebView 加载的页面不同，Debug 下加载 10.0.2.2，release 下加载 yet.run:8000.

## Android Studio 疑难杂症

### Gradle 代理

开局弹出 Gradle 代理设置，选择 "No".

参考资料：[设置代理设置](https://developer.android.com/studio/intro/studio-config.html#proxy)