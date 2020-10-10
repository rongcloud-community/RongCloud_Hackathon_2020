module Entities
  class User < Grape::Entity
    expose :id
    expose :name
    expose :mobile
    expose :avatar
  end
end
