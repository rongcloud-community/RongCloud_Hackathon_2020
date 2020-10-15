class ConversationPolicy
  attr_reader :user, :conversation

  def initialize(user, conversation)
    @user = user
    @conversation = conversation
  end

  def own?
    conversation.source_scene.user == user || conversation.target_scene.user = user
  end
end
