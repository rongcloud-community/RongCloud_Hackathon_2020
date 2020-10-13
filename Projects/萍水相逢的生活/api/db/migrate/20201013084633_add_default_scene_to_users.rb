class AddDefaultSceneToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :default_scene, comment: '用户的默认场景'
  end
end
