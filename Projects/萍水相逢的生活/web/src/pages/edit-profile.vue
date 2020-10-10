<template>
  <f7-page name="profile">
    <f7-navbar back-link="返回" title="编辑 - 个人中心">
      <f7-nav-right>
        <f7-link href="#" icon-f7="checkmark_circle" @click="update" />
      </f7-nav-right>
    </f7-navbar>

    <f7-list>
      <f7-list-input label="姓名"
                     type="text"
                     placeholder="请填写新姓名"
                     :value="user.name"
                     @input="user.name = $event.target.value"
      ></f7-list-input>
      <f7-list-input label="手机号"
                     type="text"
                     :value="user.mobile"
                     @input="user.mobile = $event.target.value"
                     readonly
      ></f7-list-input>
      <f7-list-input
        label="头像（点击选择头像）"
        :input="false"
      >
        <ImageUploader slot="input" @uploaded="user.avatar = $event.url">
          <img :src="user.avatar" width="66" height="66" />
        </ImageUploader>
      </f7-list-input>

      <f7-block>
        <f7-row>
          <f7-col>
            <f7-button back large outline color="red">取消</f7-button>
          </f7-col>
          <f7-col>
            <f7-button large fill @click="update">确定</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
    </f7-list>
  </f7-page>
</template>

<script>
import { User } from 'models'
import ImageUploader from '@/components/image-uploader'

export default {
  name: 'UpdateProfilePage',
  components: {
    ImageUploader
  },
  data () {
    return {
      user: {
        name: '',
        mobile: '',
        avatar: null
      }
    }
  },
  mounted () {
    this.user = Object.assign(this.user, this.$store.state.user)
  },
  methods: {
    async update () {
      this.$store.dispatch('updateUser', this.user)
      this.$f7router.back()
    }
  }
}
</script>
