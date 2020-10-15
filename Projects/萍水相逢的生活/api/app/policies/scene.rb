class ScenePolicy
  attr_reader :current_user, :scene

  def initialize(current_user, scene)
    @current_user = current_user
    @scene = scene
  end

  def own?
    return scene.user == current_user
  end
end
