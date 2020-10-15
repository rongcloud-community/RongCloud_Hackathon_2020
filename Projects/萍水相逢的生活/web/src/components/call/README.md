# Call 组件

## 使用

Call 组件可作为插件使用：

```javascript
import CallComponent '@/components/call'

Vue.use(CallComponent)
```

这样获取到两个全局方法：

```javascript
this.$callInit()
this.$callStart(targetId, type)
```
