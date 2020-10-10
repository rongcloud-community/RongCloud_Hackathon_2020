FactoryBot.define do
  factory :message do
    body_type { 'text' }
    body { { text: 'Hello, world!' } }
    sender factory: :scene
    receiver factory: :scene
    conversation
  end
end
