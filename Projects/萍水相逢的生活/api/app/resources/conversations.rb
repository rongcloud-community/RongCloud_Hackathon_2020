module Resources
  class Conversations < Grape::API
    namespace 'scenes/:scene_id' do
      before do
        @source_scene = Scene.find(params[:scene_id])
        authorize @source_scene, :own?
      end

      resource :conversations do
        get '' do
          conversations = Conversation.all.order_by_recent_message
            .where('conversations.source_scene_id = ? or conversations.target_scene_id = ?', 
                   @source_scene.id, @source_scene.id)

          present :conversations, conversations, with: Entities::Conversation, current_user: current_user
        end

        params do
          requires :target_scene_number, type: String, presence: true
        end
        post '' do
          target_scene = Scene.find_by_number(params[:target_scene_number])

          conversation = nil
          if conversation = Conversation.find_by(source_scene: @source_scene, target_scene: target_scene)
            status 200
          elsif conversation = Conversation.find_by(source_scene: target_scene, target_scene: @source_scene)
            status 200
          else
            status 201
            conversation = Conversation.create!(source_scene: @source_scene, target_scene: target_scene)
          end

          present :conversation, conversation, with: Entities::Conversation, current_user: current_user
        end
      end
    end

    resources :conversations do
      route_param :id do
        before do
          @conversation = Conversation.find(params[:id])
          authorize @conversation, :own?
        end

        get '' do
          present :conversation, @conversation, with: Entities::Conversation, current_user: current_user
        end

        post 'read' do
          @conversation.set_readtime(current_user, Time.now)

          body false
        end
      end
    end
  end
end
