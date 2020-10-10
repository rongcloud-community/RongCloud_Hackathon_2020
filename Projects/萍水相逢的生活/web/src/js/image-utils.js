import OssLib from './oss-lib'

async function handleUploadImageEvent (event, callback) {
  for (const file of event.target.files) {
    if (!/^image\//.test(file.type)) {
      this.$f7.toast.show({
        text: '请选择一张图片',
        position: 'center',
        closeTimeout: 2000,
      })
      continue
    } else {
      const remoteImage = await OssLib.upload(file)
      callback(remoteImage)
    }

    // 客户端直传的方式不需要读取文件的内容
    // const reader = new FileReader()
    // reader.onload = async e => { 
    //   const dataUrl = e.target.result 

    //   // 首先，上传文件到阿里云
    //   const remoteImage = await OssLib.upload(dataUrl)

    //   // 然后，调用回调函数
    //   callback(remoteImage)
    // }
    // reader.readAsDataURL(file)
  }

  event.target.value = ''
}

export {
  handleUploadImageEvent
}
