import store from '@/js/store'
import MessageLib from '@/js/message-lib'

async function setPlatform () {
  const queryString = window.location.search.replace(/^\?/, '')
  const queryObject = queryString.split('&').reduce((query, token) => {
    const [key, value] = token.split('=')
    return Object.assign({}, query, { [key]: value })
  }, {})

  const platform = queryObject.platform || 'web'
  store.commit('setPlatform', platform)

  // 如果当前平台是 Web，则要添加若干 script 标签
  await importRongWebSDK()

  // 还要告诉 MessageLib 当前平台是什么，好让它配置适配器
  MessageLib.setPlatform(platform)
  
  // TODO: 只在开发环境做如是
  if (platform === 'android') {
    amendAndroidConsole(console)
  } else if (platform === 'ios') {
    amendAppleConsole(console)
  }
}

async function setToken () {
  if ('token' in globalStorage) {
    await store.dispatch('initToken', globalStorage.token)
  }
}

export { setPlatform, setToken }

const logLevels = ["debug", "error", "info", "log", "warn"]

function amendAndroidConsole (console) {
  logLevels.forEach(level => {
    const originalFunc = console[level]
    console[level] = function (...args) {
      originalFunc(args.map(JSON.stringify).join(' '))
    }
  })
}

function amendAppleConsole (console) {
  logLevels.forEach(level => {
    console[level] = function(...args){
      try {
        window.webkit.messageHandlers['logger'].postMessage({ 
          action: level,
          params: args.map(param => JSON.stringify(param))
        })
      } catch (err) {
        window.webkit.messageHandlers['logger'].postMessage({ 
          action: 'log',
          params: ["执行 console 输出时遇到错误", err.message]
        })
      }
    }
  })
}

function importRongWebSDK () {
  return Promise.all(
    [
      "https://cdn.ronghub.com/RongIMLib-2.5.10.min.js",
      "https://cdn.ronghub.com/RongRTC-3.2.6.min.js",
      "https://cdn.ronghub.com/RongCallLib-3.1.6.min.js"
    ].map(src => new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.setAttribute('src', src)
      script.onload = resolve
      document.body.appendChild(script)
    }))
  )
}
