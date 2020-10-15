const baseUrl='/app'

export const request = (url, method, data) => {
	return uni.request({
		url: baseUrl + url,
		method: method,
		header: { 'content-type': "application/json" },
		data: data,
		dataType: 'json'
	}).then( res => {
		return res[1].data
	})
}
// 单文件上传
const upload_one = (url,file) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title:'上传中...',
			mask: true
		})
		uni.uploadFile({
			url: baseUrl + url, //仅为示例，非真实的接口地址
			filePath: file,
			name: 'file',
			success: (uploadFileRes) => {
				if("string"===typeof uploadFileRes.data){
					resolve(JSON.parse(uploadFileRes.data).data)
				}else{
					resolve( uploadFileRes.data.data )
				}	
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}

export const imgUpload = (url,files) => {
	let num = files.length;
	return new Promise(async (resolve, reject) => {
		let img_urls = []
		for (let i = 0; i < num; i++) {
			let img_url = await upload_one(url,files[i])
			img_urls.push(img_url)
		}
		console.log("全部上传成功")
		resolve(img_urls)
	})
}

export default {request, imgUpload}