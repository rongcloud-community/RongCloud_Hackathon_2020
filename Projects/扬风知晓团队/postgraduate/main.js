import Vue from 'vue'
import App from './App'
import store from './store'
import api from '@/common/api/index.js'
import messages from '@/common/util/message.js'
import RongIMLib from '@/lib/RongIMLib-3.0.7-dev.js'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$messages = messages
Vue.prototype.$store = store
Vue.prototype.$RongIMLib = RongIMLib

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
