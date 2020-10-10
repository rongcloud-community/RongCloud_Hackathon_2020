module Resources
  class Scenes < Grape::API
    helpers do
      params :scene do
        requires :scene, type: Hash do
          requires :name, type: String
          optional :number, type: String
          optional :nickname, type: String
          optional :avatar, type: String
        end
      end
    end

    resource :scenes do
      get do
        authorize User, :login?
        present :scenes, current_user.scenes.activated, with: Entities::Scene
      end

      params do
        use :scene
      end
      post do
        authorize User, :login?

        scene_params = declared(params, include_missing: false)[:scene]
        scene = current_user.create_scene(scene_params)

        present :scene, scene, with: Entities::Scene, full: true
      end

      route_param :id, type: Integer do
        get do
          scene = Scene.activated.find(params[:id])
          authorize User, :login?

          present :scene, scene, with: Entities::Scene, full: true
        end

        params do
          use :scene
        end
        put do
          scene = Scene.find(params[:id])
          authorize scene, :own?

          scene_params = declared(params, include_missing: true)[:scene]
          scene.update!(scene_params)
          present :scene, scene, with: Entities::Scene, full: true
        end

        delete do
          scene = Scene.find(params[:id])
          authorize scene, :own?

          scene.update!(activated: false)
          body false
        end
      end
    end
  end
end
