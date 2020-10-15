module Resources
  class Index < Grape::API
    version 'v1', using: :header, vendor: 'vendor'
    format :json
    prefix :api if ENV['RACK_ENV'] != 'test'

    formatter :json, ->(object, env) {
      JSON.pretty_generate(object, indent: '  ', space: ' ')
    }

    error_formatter :json, ->(error, backtrace, options, env, original_exception) {
      JSON.pretty_generate(error, indent: '  ', space: ' ')
    }

    before do
      set_current_user if headers.key?('X-Token')
    end

    rescue_from Pundit::NotAuthorizedError do |e|
      message = "You are not allowed to #{e.query} originated from #{e.policy.class}"
      error!({ code: 'unauthorized', message: message }, 403)
    end

    rescue_from ActiveRecord::RecordNotFound do |e|
      error!({ code: 'resource_not_found', message: e.message }, 404)
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      messages = e.record.errors.messages.map do |name, messages|
        [name, messages[0]]
      end.to_h
      error!({ code: 'resource_invalid', message: e.message, detail: messages }, 422)
    end

    rescue_from Grape::Exceptions::ValidationErrors do |e|
      error!({ code: 'parameter_invalid', message: e.message }, 400)
    end

    # 捕获其他继承自 StandardError 的异常。如果需要，取消以下的代码注释并改写相应的逻辑。
    # rescue_from :all do |e|
    #   error!({ code: 'unknonw_error', message: '发生了未知错误' }, 500)
    # end

    helpers do
      include Pundit

      def set_current_user
        @_current_user = User.from_token(headers['X-Token'])
      rescue Token::Errors::Invalid
        error!({ 'code': 'token_invalid', message: 'token 格式异常' }, 401)
      end

      def current_user
        @_current_user
      end
    end

    desc 'App description', hidden: true
    get do
      return {
        app_name: 'communication api'
      }
    end

    # mount 语句一定要放在最后
    mount Resources::Users
    mount Resources::Scenes
    mount Resources::Conversations
    mount Resources::Messages
    mount Resources::Logins
    mount Resources::Uploads

    route :any, '*path' do
      error!({ code: 'route_not_found', message: '访问的路径不存在' }, 404)
    end
  end
end
