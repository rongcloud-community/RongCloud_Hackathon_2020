FactoryBot.define do
  factory :user do
    name { 'name' }
    sequence(:mobile) { |n| "f#{n}" }
  end
end
