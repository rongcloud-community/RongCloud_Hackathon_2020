import Vue from 'vue'
import Vuex from 'vuex'
import { setTokenHeader, clearTokenHeader } from 'api'
import { User } from '@/models'
import MessageLib from './message-lib'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    platform: 'web'
  },
  mutations: {
    setCurrentUser (state, user) {
      state.user = user
    },
    setPlatform (state, platform) {
      state.platform = platform
    }
  },
  actions: {
    async initToken (context, token) {
      setTokenHeader(token)

      // 初始化消息库
      let imToken = null
      try {
        const data = await User.getToken('im')
        imToken = data.token
      } catch (e) {
        if (e.response && e.response.data.code === 'token_invalid') {
          delete globalStorage.token
          clearTokenHeader()
          return
        } else {
          throw e
        }
      }
      await MessageLib.connect(imToken)

      // 设置当前用户
      const user = await User.current()
      context.commit('setCurrentUser', user)

      document.title = `场信：${user.name}`
    },
    clearToken (context) {
      clearTokenHeader()
      MessageLib.disconnect()
      context.commit('setCurrentUser', null)
    },
    async updateUser (context, user) {
      // 更新当前用户
      await context.state.user.update(user)

      // 设置当前用户
      context.commit('setCurrentUser', context.state.user.clone())
    }
  }
})

export default store
