module Entities
  class Conversation < Grape::Entity
    expose :id
    expose :source_scene, using: Entities::Scene do |instance, options|
      instance.source_scene.user === options[:current_user] ?
        instance.source_scene : instance.target_scene
    end
    expose :target_scene, using: Entities::Scene do |instance, options|
      instance.source_scene.user === options[:current_user] ?
        instance.target_scene : instance.source_scene
    end
    expose :last_message, using: Entities::Message
    expose :unread_count do |instance, options|
      instance.unread_messages_of(options[:current_user]).count
    end
  end
end
