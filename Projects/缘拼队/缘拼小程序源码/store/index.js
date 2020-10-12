import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		conversation:[],
		msgList:[],
		msgImgList:[],
		pushStatus:false
	},
	mutations: {
		updateConver(state,arr) {
			state.conversation = arr;
		},
		pushConver(state,obj) {
			state.conversation.push(obj);
		},
		updateMsg(state,arr) {
			state.msgList = arr;
		},
		pushMsg(state,obj) {
			state.msgList.push(obj);
		},
		updateImg(state,arr) {
			state.msgImgList = arr;
		},
		pushImg(state,str) {
			state.msgImgList.push(str);
		},
		changePush(state,stat) {
			state.pushStatus = stat;
		}
	}
})
export default store;