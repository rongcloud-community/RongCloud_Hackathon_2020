# 插件开发：Toast 组件

该组件仅仅作为一个示例演示如何开发 Vue 插件，参见：

> [记录 vue 插件开发 —— 手撸 toast 插件](https://ithack.github.io/2019/01/17/%E8%AE%B0%E5%BD%95vue%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91-%E6%89%8B%E6%92%B8toast%E6%8F%92%E4%BB%B6.html)

## 使用

在 `js/app.js` 内引入：

```javascript
import '@/components/toast/index.css';
import Toast from '@/components/toast/index';

Vue.use(Toast);
```

然后在组件内使用即可：

```javascript
this.$toast("Hello, world!", { duration: 1500 })
```
