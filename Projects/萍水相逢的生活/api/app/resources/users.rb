module Resources
  class Users < Grape::API
    helpers do
      params :user do
        requires :user, type: Hash do
          requires :mobile, type: String
          optional :name, type: String
          optional :avatar, type: String
        end
      end
    end

    resource :users do
      get do
        users = User.all
        present :users, users, with: Entities::User
      end

      params do
        use :user
      end
      post do
        user_params = declared(params, include_missing: false)[:user]
        user = User.create!(user_params)
        user.create_scene(name: '快递（默认创建）')
        user.create_scene(name: '租房（默认创建）')
        user.create_scene(name: '杂事（默认创建）')
        present :user, user, with: Entities::User
      end
    end

    resource :user do
      get do
        authorize User, :login?
        present :user, current_user, with: Entities::User
      end

      params do
        requires :scope, values: ['im']
      end
      get 'token' do
        authorize User, :login?

        response = RestClient.post('http://api-cn.ronghub.com/user/getToken.json', {
          userId: current_user.id,
          name: 'S1',
          protraitUri: 'https://gitee.com/run27017/assets/raw/master/avatars/bear.jpg'
        }, {
          'App-Key': 'pvxdm17jpe4ir',
          'Nonce': '1112140809',
          'Timestamp': '1598688299',
          'Signature': '2d51fe713fcc4453f558d6ac29203e727d7b2517'
        })
        result = JSON.parse(response.body)
        { token: result['token'] }
      end

      params do
        use :user
      end
      put do
        authorize User, :login?
        user_params = declared(params, include_missing: false)[:user]
        current_user.update!(user_params)
        present :user, current_user, with: Entities::User
      end
    end
  end
end
