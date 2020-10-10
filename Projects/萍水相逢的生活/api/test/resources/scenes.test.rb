require_relative '../test_helper'

module Resources
  class ScenesTest < Resources::Test
    def setup
      super
      @user = create(:user)
    end

    def test_list_all
      create_list(:scene, 2, user: @user)
      create(:scene, user: @user, activated: false)
      create_list(:scene, 3)

      header 'X-Token', @user.to_token
      get '/scenes'
      assert_equal 200, last_response.status
      assert_equal 2, last_response_json['scenes'].size
    end

    def test_create
      header 'X-Token', @user.to_token
      post '/scenes', { scene: { name: 'new scene' } }
      assert_equal 201, last_response.status, last_response.body
      assert_equal 'new scene', last_response_json['scene']['name']
      assert_equal @user.id, last_response_json['scene']['user_id']
      assert last_response_json['scene']['number']
    end

    def test_show
      scene = create(:scene, user: @user)

      header 'X-Token', @user.to_token
      get "/scenes/#{scene.id}"
      assert_equal 200, last_response.status, last_response.body
      assert_equal scene.id, last_response_json['scene']['id']
    end

    def test_update
      scene = create(:scene, user: @user)

      header 'X-Token', @user.to_token
      put "/scenes/#{scene.id}", { scene: { name: 'updated scene' }}
      assert_equal 200, last_response.status, last_response.body
      assert_equal scene.id, last_response_json['scene']['id']
      assert_equal 'updated scene', last_response_json['scene']['name']
      assert_nil last_response_json['scene']['nickname']
    end

    def test_update_number
      scene = create(:scene, user: @user)

      header 'X-Token', @user.to_token
      put "/scenes/#{scene.id}", { scene: { name: scene.name, number: 'x-new' }}
      assert_equal 200, last_response.status, last_response.body
      assert_equal scene.id, last_response_json['scene']['id']
      assert_equal 'x-new', last_response_json['scene']['number']
    end

    def test_destroyed
      scene = create(:scene, user: @user)

      header 'X-Token', @user.to_token
      delete "/scenes/#{scene.id}"
      assert_equal 204, last_response.status, last_response.body
      assert !scene.reload.activated
    end
  end
end
