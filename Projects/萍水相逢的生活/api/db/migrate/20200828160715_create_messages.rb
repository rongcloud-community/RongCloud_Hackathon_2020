class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :body_type, default: 'text', comment: '消息体的格式，如 text、image 等'
      t.string :body, comment: '对象格式的消息体内容'
      t.timestamps comment: '时间戳'
      t.belongs_to :sender, commeng: '消息发送方，其是一个场景'
      t.belongs_to :receiver, comment: '消息接收方，其是一个场景'
      t.belongs_to :conversation, comment: '所属会话'
    end
  end
end
