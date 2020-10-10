// const { url: remoteUrl } = await api.upload({ data: dataUrl })
import OSS from 'ali-oss'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import uploadApi from 'api/upload'

const client = new OSS({
  region: 'oss-cn-shanghai',
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
  accessKeyId: 'LTAI4GA5D8vGhL4shaSJerkz',
  accessKeySecret: 'mkmbsr1d9JmvO4wkTCGwqTf59flSlk',
  bucket: 'dev-002'
})

const upload = (function () {
  if (process.env.VUE_APP_UPLOAD_ENGINE === 'backend') {
    return async function (dataUrl) {
      const result = await uploadApi({ data: dataUrl })
      return result
    }
  } else {
    return async function (file) {
      const path = uuidv4()
      const { url: imageUrl } = await client.put(path, file)
      const imageInfo = await axios.get(`${imageUrl}?x-oss-process=image/info`)
      return { 
        url: imageUrl, 
        size: [parseInt(imageInfo.imageWidth.value), parseInt(imageInfo.imageHeight.value)]
      }
    }
  }
})()

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

export default {
  upload
}
