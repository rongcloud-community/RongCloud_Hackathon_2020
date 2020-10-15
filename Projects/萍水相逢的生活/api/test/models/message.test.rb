require_relative '../test_helper'

module Models
  class ConversationTest < Models::Test
    def test_no_params_create
      create(:message)
    end

    def test_write_text_body
      message = build(:message, body_type: nil, body: nil)
      message.body = 'Hello, world!'
      assert_equal 'text', message.body_type
      assert_equal({ text: 'Hello, world!' }, message.body)
    end
  end
end
