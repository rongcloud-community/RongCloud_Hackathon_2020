class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, comment: '姓名'
      t.string :mobile, comment: '手机号'
      t.string :avatar, comment: '头像'
    end
  end
end
