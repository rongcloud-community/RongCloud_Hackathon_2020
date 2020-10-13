class CreateScenes < ActiveRecord::Migration[6.0]
  def change
    create_table :scenes do |t|
      t.string :name, comment: '场景名称，非用户名称'
      t.string :nickname, comment: '昵称，显示给其他用户查看的名称'
      t.string :number, comment: '场景号，即用户号'
      t.string :avatar, comment: '场景头像'
      t.boolean :activated, default: true, comment: '是否是激活状态，否则就是已注销'
      t.timestamps comment: '时间戳'

      t.belongs_to :user, comment: '创建它的用户'
    end
  end
end
