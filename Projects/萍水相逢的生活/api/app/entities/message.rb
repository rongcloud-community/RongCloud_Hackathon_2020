module Entities
  class Message < Grape::Entity
    expose :id
    expose :type do |instance|
      instance.body_type
    end
    expose :body 
    expose :time do |instance|
      instance.created_at
    end
    expose :direction do |instance, options|
      current_user = options[:current_user]
      instance.sender.user === current_user ? 'sent' : 'received'
    end
    expose :conversation_id
  end
end
