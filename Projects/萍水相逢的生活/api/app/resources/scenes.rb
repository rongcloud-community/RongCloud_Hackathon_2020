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
        present :scenes, current_user.scenes.activated, with: Entities::Scene, current_user: current_user
      end

      params do
        use :scene
      end
      post do
        authorize User, :login?

        scene_params = declared(params, include_missing: false)[:scene]
        scene = current_user.create_scene(scene_params)

        present :scene, scene, with: Entities::Scene, full: true, current_user: current_user
      end

      route_param :id, type: Integer do
        before do
          @scene = Scene.activated.find(params[:id])
        end

        get do
          authorize User, :login?

          present :scene, @scene, with: Entities::Scene, full: true, current_user: current_user
        end

        params do
          use :scene
        end
        put do
          authorize @scene, :own?

          scene_params = declared(params, include_missing: true)[:scene]
          @scene.update!(scene_params)
          present :scene, @scene, with: Entities::Scene, full: true, current_user: current_user
        end

        delete do
          authorize @scene, :own?

          if @scene.default?
            error!({ code: 'forbidden', message: '默认场景不支持删除' })
          else
            @scene.update!(activated: false)
            body false
          end
        end

        post 'as_default' do
          authorize @scene, :own?

          current_user.update!(default_scene: @scene)
          body false
        end
      end
    end
  end
end
