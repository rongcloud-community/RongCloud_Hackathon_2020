<template>
  <f7-page name="profile">
    <f7-navbar back-link="返回" title="个人中心">
      <f7-nav-right>
        <f7-link href="/profile/edit/" icon-f7="square_pencil" />
      </f7-nav-right>
    </f7-navbar>

    <f7-list>
      <f7-list-item title="姓名" :after="user.name" @click="action = 'update'"></f7-list-item>
      <f7-list-item title="手机号" :after="user.mobile"></f7-list-item>
      <f7-list-item title="头像">
        <img :src="user.avatar" width="66" height="66" slot="after" />
      </f7-list-item>
      <f7-block>
        <f7-button @click="logout" color="red">退出登录</f7-button>
      </f7-block>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  name: 'ProfilePage',
  computed: {
    user () {
      return this.$store.state.user || {}
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('clearToken')
      delete globalStorage.token
      this.$f7router.navigate('/login/')
    }
  }
}
</script>
