require_relative '../test_helper'

module Resources
  class MessagesTest < Resources::Test
    def test_list
      conversation = create(:conversation)
      message1 = create(:message, created_at: Time.now - 2.minutes, conversation: conversation)
      message2 = create(:message, created_at: Time.now - 1.minutes, conversation: conversation)
      message3 = create(:message, created_at: Time.now, conversation: conversation)

      header 'X-Token', conversation.source_scene.user.to_token
      get "/conversations/#{conversation.id}/messages", { 
        time_before: message3.created_at, per_page: 1 
      }
      assert_equal 200, last_response.status, last_response.body
      assert_equal [message2.id], last_response_json['messages'].map{|it| it['id']}

      header 'X-Token', conversation.source_scene.user.to_token
      get "/conversations/#{conversation.id}/messages", { 
        message_id_before: message3.id, per_page: 1 
      }
      assert_equal 200, last_response.status, last_response.body
      assert_equal [message2.id], last_response_json['messages'].map{|it| it['id']}
    end

    def test_send
      conversation = create(:conversation) # source scene is 1, target scene is 2

      header 'X-Token', conversation.target_scene.user.to_token # sent by target scene
      post "/conversations/#{conversation.id}/messages", { message: { body: 'Hello' } }

      assert_equal 201, last_response.status, last_response.body
    end
  end
end
