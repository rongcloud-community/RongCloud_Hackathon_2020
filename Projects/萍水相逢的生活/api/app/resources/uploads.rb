require 'aliyun/oss'

module Resources
  class Uploads < Grape::API
    # 上传图片的返回值：
    #
    # - url
    # - size: [width, height]
    params do
      requires :data, type: String
    end
    post '/uploads' do
      size = FastImage.size(params[:data]) # 原始的 BASE64 Data URL

      base64_data = params[:data].sub(%r{^data:\w+/\w+;base64,}, '')
      binary_data = Base64.decode64(base64_data)

      client = Aliyun::OSS::Client.new(
        endpoint: 'oss-cn-shanghai.aliyuncs.com',
        access_key_id: Settings.oss.access_key,
        access_key_secret: Settings.oss.access_secret
      )

      path = SecureRandom.uuid
      bucket = client.get_bucket(Settings.oss.bucket)
      bucket.put_object(path) do |stream|
        stream << binary_data 
      end

      return {
        url: File.join(Settings.oss.host, path),
        size: size
      }
    end
  end
end
