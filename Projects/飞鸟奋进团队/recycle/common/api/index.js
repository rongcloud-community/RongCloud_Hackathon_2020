import { request, imgUpload } from '@/common/util/request.js'

export default {
	
	/**时间转换
	 * @param {Object} time 时间字符串
	 * @param {Object} type 转换类型 1 年月日 2 年月日 时分秒
	 */
	formatTime(time, type = 1) {
		let rs = ''
		const date = new Date(time)
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()
		let hours = date.getHours()
		if (hours < 10)
			hours = "0" + hours
		let minutes = date.getMinutes()
		if (minutes < 10)
			minutes = "0" + minutes
		let seconds = date.getSeconds()
		if (seconds < 10)
			seconds = "0" + seconds
		switch (type) {
			case 1: // 年月日
				rs = year + '-' + month + '-' + day
				break
			case 2: // 年月日 时分秒
				rs = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' +seconds
				break
			default:
				rs = '格式不正确'
		}
		return rs
	},
	
	/**
	 * 登录用户
	 */
	login (param = {}) {
		return request('/loginCustomer', 'POST', param)
	},
	
	/**
	 * 获取录播图
	 */
	getAllBanners (param = {}) {
		return request('/getAllBanners', 'GET', param)
	},
	
	/**
	 * 获取招生信息列表
	 */
	getAdvices (param = {}) {
		return request('/listAdvice', 'GET', param)
	},
	
	/**
	 * 获取师傅信息列表
	 */
	getMasters (param = {}) {
		return request('/listMaster', 'GET', param)
	},
	
	/**
	 * 获取文章信息列表
	 */
	getArticles (param = {}) {
		return request('/listArticle', 'GET', param)
	},
	
	/**
	 * 获取招生单条数据
	 */
	getAdvice (param = {}) {
		return request('/getAdvice', 'GET', param)
	},
	
	/**
	 * 获取教师单条数据
	 */
	getTeacher (param = {}) {
		return request('/getTeacher', 'GET', param)
	},
	
	/**
	 * 获取文章单条数据
	 */
	getArticle (param = {}) {
		return request('/getArticle', 'GET', param)
	},
	
	/**
	 * 收藏操作
	 */
	giveCollect (param = {}) {
		return request('/giveCollect', 'POST', param)
	},
	
	/**
	 * 获取用户收藏的文章
	 */
	getArticlesByCustomer (param = {}) {
		return request('/getArticlesByCustomer', 'GET', param)
	},
	
	/**
	 * 文件上传
	 */
	uploadImg (files=[]) {
		return imgUpload('/uploadImg', files)
	},
	
	/**
	 * 新增用户
	 */
	register (param = {}) {
		return request('/addCustomer', 'POST', param)
	}
}