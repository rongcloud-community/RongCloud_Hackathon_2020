# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_28_160715) do

  create_table "conversations", force: :cascade do |t|
    t.datetime "source_readtime", default: "1970-01-01 00:00:00"
    t.datetime "target_readtime", default: "1970-01-01 00:00:00"
    t.integer "source_scene_id"
    t.integer "target_scene_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["source_scene_id"], name: "index_conversations_on_source_scene_id"
    t.index ["target_scene_id"], name: "index_conversations_on_target_scene_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "body_type", default: "text"
    t.string "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "sender_id"
    t.integer "receiver_id"
    t.integer "conversation_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["receiver_id"], name: "index_messages_on_receiver_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "scenes", force: :cascade do |t|
    t.string "name"
    t.string "nickname"
    t.string "number"
    t.string "avatar"
    t.boolean "activated", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.index ["user_id"], name: "index_scenes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "mobile"
    t.string "avatar"
  end

end
