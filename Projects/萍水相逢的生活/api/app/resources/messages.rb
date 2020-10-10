module Resources
  class Messages < Grape::API
    namespace 'conversations/:conversation_id' do
      resource :messages do
        before do
          @conversation = Conversation.find(params[:conversation_id])
          authorize @conversation, :own?
        end

        params do
          optional :time_before, type: Time
          optional :per_page, type: Integer
        end
        get '' do
          messages = @conversation.messages.order(created_at: :desc)
          if params[:time_before]
            messages = messages.where('created_at < ?', params[:time_before]) 
          end
          if params[:message_id_before]
            message = Message.find(params[:message_id_before])
            messages = messages.where('created_at < ?', message.created_at) 
          end
          messages = messages.limit(params[:per_page]) if params[:per_page]

          present :messages, messages, with: Entities::Message, current_user: current_user
        end

        params do
          requires :message, type: Hash do
            optional :type, type: String, values: ['text', 'image'], default: 'text'
            requires :body, types: [String, Hash]
          end
        end
        post '' do
          message_params = declared(params, include_missing: true)[:message]
          message = @conversation.messages.build(
            body_type: message_params[:type],
            body: message_params[:body]
          )

          source_scene = @conversation.source_scene.user === current_user ?
            @conversation.source_scene : @conversation.target_scene
          target_scene = @conversation.source_scene === source_scene ?
            @conversation.target_scene : @conversation.source_scene
          message.sender = source_scene
          message.receiver = target_scene
          message.save!

          present :message, message, with: Entities::Message, current_user: current_user
        end
      end
    end
  end
end
