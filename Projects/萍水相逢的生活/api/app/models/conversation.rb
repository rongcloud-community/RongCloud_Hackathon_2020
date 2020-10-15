class Conversation < ActiveRecord::Base
  validates :target_scene_id, uniqueness: { scope: :source_scene_id }
  validates :source_readtime, :target_readtime, presence: true

  belongs_to :source_scene, class_name: 'Scene', optional: false
  belongs_to :target_scene, class_name: 'Scene', optional: false
  has_many :messages

  scope :order_by_recent_message, ->{
    self.left_joins(:messages).group('conversations.id').order('max(messages.created_at) desc')
  }

  def last_message
    messages.last
  end

  def has_unread(owner)
    unread_messages_of(owner).count > 0
  end

  def unread_messages_of(owner)
    if owner == source_scene || owner == source_scene.user
      messages.where('created_at > ?', source_readtime)
    elsif owner == target_scene || owner == target_scene.user
      messages.where('created_at > ?', target_readtime)
    else
      raise ArgumentError, 'owner 不属于此会话'
    end
  end

  def set_readtime(owner, readtime)
    if owner == source_scene || owner == source_scene.user
      update_attribute(:source_readtime, readtime) if readtime > source_readtime
    elsif owner == target_scene || owner == target_scene.user
      update_attribute(:target_readtime, readtime) if readtime > target_readtime
    else
      raise ArgumentError, 'owner 不属于此会话'
    end
  end
end
