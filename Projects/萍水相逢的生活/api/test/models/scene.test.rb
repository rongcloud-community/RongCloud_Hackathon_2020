require_relative '../test_helper'

module Models
  class SceneTest < Models::Test
    def test_set_default_scene
      scene = create(:scene)
      scene.user.update!(default_scene: scene)
    end
  end
end
