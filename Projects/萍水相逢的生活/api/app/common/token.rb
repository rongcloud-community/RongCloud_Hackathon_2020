class Token
  def self.encode(user_id)
    payload = { user_id: user_id }
    JWT.encode payload, Settings.jwt.secret, 'HS256'
  end

  def self.decode(token)
    payload, = JWT.decode token, Settings.jwt.secret, true, { algorithm: 'HS256' }
    User.find(payload['user_id'])
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    raise Errors::Invalid
  end

  module Errors
    class Invalid < StandardError
    end
  end
end
