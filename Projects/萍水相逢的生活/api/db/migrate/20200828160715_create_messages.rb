class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :body_type, default: 'text'
      t.string :body
      t.timestamps
      t.belongs_to :sender
      t.belongs_to :receiver
      t.belongs_to :conversation
    end
  end
end
