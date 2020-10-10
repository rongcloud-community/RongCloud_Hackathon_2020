class CreateConversations < ActiveRecord::Migration[6.0]
  def change
    create_table :conversations do |t|
      t.datetime :source_readtime, default: Time.at(0)
      t.datetime :target_readtime, default: Time.at(0)
      t.belongs_to :source_scene, commnet: '会话发起的一方'
      t.belongs_to :target_scene, comment: '会话接受的一方'
      t.timestamps
    end
  end
end
