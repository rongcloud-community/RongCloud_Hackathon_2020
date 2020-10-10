require_relative '../test_helper'

module Models
  class ConversationTest < Models::Test
    def test_order_by_last_message
      message1 = create(:message, created_at: Time.new(2020, 1, 1))
      message2 = create(:message, created_at: Time.new(2020, 3, 1))
      message3 = create(:message, created_at: Time.new(2020, 2, 1))
      message4 = create(:message, created_at: Time.new(2019, 2, 1), conversation: message3.conversation)

      assert_equal [
        message2.conversation, message3.conversation, message1.conversation
      ], Conversation.all.order_by_recent_message
    end

    def test_order_by_last_message2
      conversation2 = create(:conversation)
      conversation1 = create(:conversation)
      conversation3 = create(:conversation)

      now = Time.now

      create(:message, created_at: now - 1.year - 1.month, conversation: conversation1)
      create(:message, created_at: now, conversation: conversation1)
      create(:message, created_at: now - 1.days - (100).minutes, conversation: conversation2)
      create(:message, created_at: now - 1.year - 1.month, conversation: conversation3)

      assert_equal [conversation1, conversation2, conversation3], Conversation.all.order_by_recent_message
    end

    def test_last_message
      conversation = create(:conversation)
      message1 = create(:message, created_at: Time.new(2020, 1, 1), conversation: conversation)
      message2 = create(:message, created_at: Time.new(2020, 1, 2), conversation: conversation)

      assert_equal message2, conversation.last_message
    end

    def test_unread_messages
      conversation = create(
        :conversation, 
        source_readtime: Time.new(2020, 1, 1), 
        target_readtime: Time.new(2020, 1, 2)
      )
      message1 = create(:message, created_at: Time.new(2020, 1, 1), conversation: conversation)
      message2 = create(:message, created_at: Time.new(2020, 1, 2), conversation: conversation)
      message3 = create(:message, created_at: Time.new(2020, 1, 3), conversation: conversation)

      assert_equal [message2, message3].to_set, conversation.unread_messages_of(conversation.source_scene).to_set
      assert_equal [message2, message3].to_set, conversation.unread_messages_of(conversation.source_scene.user).to_set

      assert_equal [message3].to_set, conversation.unread_messages_of(conversation.target_scene).to_set
      assert_equal [message3].to_set, conversation.unread_messages_of(conversation.target_scene.user).to_set
    end

    def test_set_readtime
      conversation = create(:conversation)

      conversation.set_readtime(conversation.source_scene, Time.new(2020, 1, 1))
      assert_equal Time.new(2020, 1, 1), conversation.source_readtime

      conversation.set_readtime(conversation.target_scene, Time.new(2020, 1, 2))
      assert_equal Time.new(2020, 1, 2), conversation.target_readtime
    end

    def test_set_readtime_through_user
      conversation = create(:conversation)

      conversation.set_readtime(conversation.source_scene.user, Time.new(2020, 1, 1))
      assert_equal Time.new(2020, 1, 1), conversation.source_readtime

      conversation.set_readtime(conversation.target_scene.user, Time.new(2020, 1, 2))
      assert_equal Time.new(2020, 1, 2), conversation.target_readtime
    end
  end
end
