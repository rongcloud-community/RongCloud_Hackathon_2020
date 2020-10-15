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

    def test_initiate_with_source_id_and_target_number
      source_scene = create(:scene, number: 's1')
      target_scene = create(:scene, number: 's2')

      header 'X-Token', source_scene.user.to_token
      post "/conversations", { 
        source_scene_id: source_scene.id,
        target_scene_number: target_scene.number 
      }
      assert_equal 201, last_response.status, last_response.body
      assert_equal target_scene.id, last_response_json['conversation']['target_scene']['id']
    end

    def test_initiate_with_only_target_id
      user = create(:user)
      create(:scene, user: user)
      source_scene = create(:scene, number: 's1', user: user)
      create(:scene, user: user)
      user.update!(default_scene: source_scene)

      target_scene = create(:scene, number: 's2')

      header 'X-Token', source_scene.user.to_token
      post "/conversations", {
        target_scene_id: target_scene.id 
      }

      assert_equal 201, last_response.status, last_response.body
      assert_equal source_scene.id, last_response_json['conversation']['source_scene']['id']
      assert_equal target_scene.id, last_response_json['conversation']['target_scene']['id']
    end

    def test_initiate_exist_conversation
      conversation = create(:conversation)

      header 'X-Token', conversation.target_scene.user.to_token
      post "/conversations", { 
        source_scene_id: conversation.target_scene.id,
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
