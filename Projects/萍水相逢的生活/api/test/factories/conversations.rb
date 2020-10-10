FactoryBot.define do
  factory :conversation do
    source_scene factory: :scene
    target_scene factory: :scene
  end
end
