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

      end
    end

    resources :conversations do
      params do
        optional :source_scene_id, type: Integer
        optional :target_scene_id, type: Integer
        optional :target_scene_number, type: String
      end
      post '' do
        @source_scene = params.key?(:source_scene_id) ? 
          Scene.find(params[:source_scene_id]) : current_user.default_scene

        target_scene = params.key?(:target_scene_id) ? Scene.find(params[:target_scene_id]) : Scene.find_by_number(params[:target_scene_number])
        error!({ code: 'resource_not_found' }, 404) unless target_scene

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
