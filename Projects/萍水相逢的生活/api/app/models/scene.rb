class Scene < ActiveRecord::Base
  validates :number, uniqueness: true, allow_nil: true

  belongs_to :user, optional: false

  scope :activated, -> { where(activated: true) }

  def conversations
    Conversation.where('source_scene_id = ? or target_scene_id = ?', id, id)
  end

  def unread_conversation_count
    conversations.count do |conversation|
      conversation.has_unread(self)
    end
  end
end
