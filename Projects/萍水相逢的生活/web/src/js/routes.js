import LoginPage from '@/pages/login.vue'
import ScenesPage from '@/pages/scenes.vue'
import ScenePage from '@/pages/scene.vue'
import EditScenePage from '@/pages/edit-scene.vue'
import ConversationPage from '@/pages/conversation.vue'
import ProfilePage from '@/pages/profile.vue'
import EditProfilePage from '@/pages/edit-profile.vue'
import { Conversation } from 'models'

const routes = [
  {
    name: 'home',
    path: '/',
    beforeEnter (to, from, resolve, reject) {
      if (globalStorage.token) {
        reject()
        this.navigate('/scenes/')
      } else {
        reject()
        this.navigate('/login/')
      }
    }
  },
  {
    name: 'login',
    path: '/login/',
    loginScreen: {
      component: LoginPage
    }
  },
  {
    name: 'profile',
    path: '/profile/',
    component: ProfilePage
  },
  {
    name: 'edit-profile',
    path: '/profile/edit/',
    component: EditProfilePage
  },
  {
    name: 'scenes',
    path: '/scenes/',
    component: ScenesPage
  },
  {
    name: 'scene',
    path: '/scenes/:id/',
    component: ScenePage
  },
  {
    name: 'edit-scene',
    path: '/scenes/:id/edit/',
    component: EditScenePage 
  },
  {
    name: 'initiate-conversation',
    path: '/c/',
    async beforeEnter (to, from, resolve, reject) {
      if (globalStorage.token) {
        const targetSceneId = to.query.t
        const conversation = await Conversation.initiate({
          targetSceneId: targetSceneId
        })

        reject()
        this.navigate( {
          name: 'conversation',
          params: { id: conversation.id },
          query: { quick: 1 }
        })
      } else {
        reject()

        const url = this.generateUrl(to)
        this.navigate({ name: 'login', query: { url }})
      }
    }
  },
  {
    name: 'conversation',
    path: '/conversations/:id/',
    component: ConversationPage,
    async beforeLeave (to, from, resolve, reject) {
      await new Conversation({ id: from.params.id}).read()
      resolve()
    }
  }
]

export default routes;
