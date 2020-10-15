require_relative '../config/environment'

user1 = User.create!(name: '一个心灵受创的飘族', mobile: '#1')
user2 = User.create!(name: '外卖小哥张志平', mobile: '#2')
user3 = User.create!(name: '外卖小哥李红强', mobile: '#3')
user4 = User.create!(name: '快递小哥独无二', mobile: '#4')

scene1 = Scene.create!(name: '外卖', nickname: '爱吃外卖的飘族', number: 's1', user: user1)
scene2 = Scene.create!(name: '快递', nickname: '爱购物的飘族', number: 's2', user: user1)
scene3 = Scene.create!(name: '租房', nickname: '居无定所的飘族', number: 's3', user: user1)
user1.update!(default_scene: scene3)

scene4 = Scene.create!(name: '工作', nickname: '美团张师傅', number: 's4', user: user2)
user2.update!(default_scene: scene4)

scene5 = Scene.create!(name: '工作', nickname: '饿了么李师傅', number: 's5', user: user3)
user3.update!(default_scene: scene5)

scene6 = Scene.create!(name: '工作', nickname: '快递师傅独侠', number: 's6', user: user4)
user4.update!(default_scene: scene6)

conversation1 = Conversation.create!(source_scene: scene4, target_scene: scene1)
conversation2 = Conversation.create!(source_scene: scene5, target_scene: scene1)
conversation3 = Conversation.create!(source_scene: scene6, target_scene: scene2)

now = Time.now

Message.create!(
  body: '叮咚', 
  created_at: now - 1.year - 1.month,
  sender: scene4, 
  receiver: scene1, 
  conversation: conversation1
)
Message.create!(
  body: '你好，加个好友好吗？', 
  created_at: now - 1.year, 
  sender: scene4, 
  receiver: scene1, 
  conversation: conversation1
)
Message.create!(
  body: '你好，你的老乡鸡外卖到了', 
  created_at: now - 1.day, 
  sender: scene4, 
  receiver: scene1, 
  conversation: conversation1
)
Message.create!(
  body: '好的，收到', 
  created_at: now - 45.minutes,
  sender: scene1, 
  receiver: scene4, 
  conversation: conversation1
)

# 创建 100 条消息用于测试无限滚动
(1..100).each do |i|
  Message.create!(
    body: "你好，你的小不点外卖到了 #{i}:-)", 
    created_at: now - 1.days - (100 - i).minutes,
    sender: scene5, 
    receiver: scene1, 
    conversation: conversation2
  )
end

Message.create!(
  body: '你好，你的快递到了', 
  created_at: now - 1.year - 1.month,
  sender: scene6, 
  receiver: scene2, 
  conversation: conversation3
)
