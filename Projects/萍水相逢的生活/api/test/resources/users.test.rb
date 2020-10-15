require_relative '../test_helper'

module Resources
  class UsersTest < Resources::Test
    def test_create
      post '/users', { user: { mobile: 'x', name: 'X' } }
      assert_equal 201, last_response.status, last_response.body
      assert_equal Hash.new(mobile: 'x', name: 'X'), 
        last_response_json['user'].slice(:mobile, :name)
    end
  end
end
