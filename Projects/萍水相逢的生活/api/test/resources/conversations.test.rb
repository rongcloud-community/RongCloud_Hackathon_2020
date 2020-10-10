require_relative '../test_helper'

module Resources
  class ConversationsTest < Resources::Test
    def test_list
      scene = create(:scene)

      conversations = create_list(:conversation, 2, source_scene: scene)
      conversations += create_list(:conversation, 3, target_scene: scene)
      create_list(:conversation, 4)

      header 'X-Token', scene.user.to_token
      get "/scenes/#{scene.id}/conversations"
      assert_equal 200, last_response.status, last_response.body
      assert_equal conversations.map(&:id).to_set, last_response_json['conversations'].map{|it| it['id']}.to_set
    end

    def test_create_new
      source_scene = create(:scene, number: 's1')
      target_scene = create(:scene, number: 's2')

      header 'X-Token', source_scene.user.to_token
      post "/scenes/#{source_scene.id}/conversations", { 
        target_scene_number: target_scene.number 
      }
      assert_equal 201, last_response.status, last_response.body
      assert_equal target_scene.id, last_response_json['conversation']['target_scene']['id']
    end

    def test_create_but_exist
      conversation = create(:conversation)

      header 'X-Token', conversation.target_scene.user.to_token
      post "/scenes/#{conversation.target_scene.id}/conversations", { 
        target_scene_number: conversation.source_scene.number 
      }
      assert_equal 200, last_response.status, last_response.body
      assert_equal conversation.source_scene.id, last_response_json['conversation']['target_scene']['id']
    end

    def test_show
      conversation = create(:conversation)

      header 'X-Token', conversation.target_scene.user.to_token
      get "/conversations/#{conversation.id}"
      assert_equal 200, last_response.status, last_response.body
      assert_equal conversation.source_scene.id, last_response_json['conversation']['target_scene']['id']
    end
  end
end
