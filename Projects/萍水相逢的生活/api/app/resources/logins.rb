module Resources
  class Logins < Grape::API
    class TokenEntity < Grape::Entity
      expose :token, documentation: { type: String, desc: '用以验证用户身份的 API token' }
    end

    resource :logins do
      post do
        user = User.find_by(mobile: params[:mobile])
        if user
          status 200
          return { token: user.to_token }
        else
          error!({ code: 'user_not_exist', message: '指定手机号的账户不存在' }, 404)
        end
      end
    end
  end
end
