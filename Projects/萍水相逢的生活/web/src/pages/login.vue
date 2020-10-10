<template>
  <f7-login-screen>
    <f7-page login-screen>
      <f7-login-screen-title>场景聊天系统</f7-login-screen-title>
      <f7-list form>
        <f7-list-input
          label="手机号"
          type="text"
          placeholder="Your mobile"
          :value="user.mobile"
          @input="user.mobile = $event.target.value"
          @keypress.enter.native.prevent="signIn"
        ></f7-list-input>
        <f7-list-input
          v-show="action === 'sign_up'"
          label="姓名"
          type="text"
          placeholder="Your name"
          :value="user.name"
          @input="user.name = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          v-show="action === 'sign_up'"
          label="头像（点击选择头像）"
          :input="false"
        >
          <ImageUploader slot="input" @uploaded="user.avatar = $event.url" >
            <img :src="user.avatar" width="66" height="66" />
          </ImageUploader>
        </f7-list-input>
      </f7-list>
      <f7-list>
        <f7-list-button @click="signIn" v-if="action === 'sign_in'">
          登录
        </f7-list-button>
        <f7-list-button @click="signUp" v-if="action === 'sign_up'">
          注册
        </f7-list-button>
        <f7-block-footer>输入用户名可登录，新的用户名会为您自动创建一个用户</f7-block-footer>
      </f7-list>
    </f7-page>
  </f7-login-screen>
</template>

<script>
import { User } from '@/models'
import ImageUploader from '@/components/image-uploader'

export default {
  name: 'LoginPage',
  components: {
    ImageUploader
  },
  data () {
    return {
      user: {
        mobile: '',
        name: '',
        avatar: ''
      },
      action: 'sign_in'
    }
  },
  methods: {
    async signIn () {
      if (!this.user.mobile) return

      try {
        const { token } = await User.login({ mobile: this.user.mobile })
        this.$store.dispatch('initToken', token)
        globalStorage.token = token

        this.$f7router.navigate('/scenes/')
      } catch (e) {
        if (e.code === 'user_not_exist') {
          this.action = 'sign_up'
        } else {
          throw e
        }
      }
    },
    async signUp () {
      await User.create(this.user)
      this.signIn()
    }
  }
}
</script>
