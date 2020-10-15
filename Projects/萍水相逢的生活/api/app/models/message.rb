class Message < ActiveRecord::Base
  serialize :body, Hash

  validates :body_type, :body, presence: true

  belongs_to :sender, class_name: 'Scene', optional: false
  belongs_to :receiver, class_name: 'Scene', optional: false
  belongs_to :conversation, optional: false

  def body=(body)
    if body.is_a?(String)
      self.body_type = 'text'
      self.body = { text: body }
    else
      write_attribute :body, body
    end
  end
end
