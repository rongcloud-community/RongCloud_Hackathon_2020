module Entities
  class Scene < Grape::Entity
    expose :id
    expose :name
    expose :nickname
    expose :number
    expose :avatar
    expose :unread_count do |instance|
      instance.unread_conversation_count
    end
    expose :is_default do |instance, options|
      instance == options[:current_user].default_scene
    end
    expose :created_at
    expose :user_id
  end
end
