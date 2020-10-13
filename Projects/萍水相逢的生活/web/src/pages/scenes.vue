<template>
  <f7-page name="scenes" @page:afterin="fetchAll">
    <f7-navbar title="我的场景">
      <f7-nav-right>
        <f7-link icon-f7="person" href="/profile/"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block-title>新增场景</f7-block-title>
    <f7-list>
      <f7-list-input type="text"
                     placeholder="填写场景名称"
                     :value="scene.name"
                     @input="scene.name = $event.target.value"
      ></f7-list-input>
      <f7-list-button @click="addNew">新增</f7-list-button>
    </f7-list>

    <f7-block-title>场景列表</f7-block-title>
    <f7-list>
      <f7-list-item v-for="scene in scenes" :key="scene.id"
        :badge="scene.unreadCount" badge-color="red"
        swipeout
        :link="'/scenes/' + scene.id + '/'"
      >
        <span slot="title">
          <template v-if="scene.isDefault">
            <strong>{{ scene.name }}</strong>
          </template>
          <template v-else>
            {{ scene.name }}
          </template>
        </span>
        <f7-swipeout-actions right>
          <f7-swipeout-button 
            v-if="!scene.isDefault"
            color="blue"
            text="设为默认"
            close
            @click="setAsDefault(scene)"
          />
          <f7-swipeout-button 
            color="green"
            text="更新"
            close
            @click="updateOne(scene)"
          />
          <f7-swipeout-button 
            text="删除"
            color="red"
            close
            @click="remove(scene)"
            confirm-text="你确定要删除此场景吗？该操作目前不可恢复！"
          />
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import { Scene, Conversation } from '@/models'
import MessageLib from '@/js/message-lib'

export default {
  name: 'ScenesPage',
  data () {
    return {
      scenes: [],
      scene: {}
    }
  },
  async mounted () {
    this.fetchAll()

    MessageLib.addListener(this.receiveMessage)
  },
  methods: {
    async fetchAll () {
      this.scenes = await Scene.list()
    },
    async addNew () {
      const scene = new Scene(this.scene)
      await scene.save()

      this.scenes.push(scene)
      this.scene.name = ''
    },
    updateOne (scene) {
      this.$f7.dialog.prompt('输入新的场景名称', async name => {
        scene.name = name
        await scene.save()
      })
    },
    async remove (scene) {
      this.$f7.dialog.confirm('你确定要删除此场景吗？该操作目前不可恢复！', async () => {
        try {
          await scene.destroy()
          const index = this.scenes.findIndex(s => s.id === scene.id)
          this.scenes.splice(index, 1)
        } catch (e) {
          if (e.response && e.response.data.code === 'forbidden') {
            this.$f7.toast.show({
              text: e.response.data.message,
              position: 'center',
              closeTimeout: 2000
            })
          } else {
            throw e
          }
        }
      })
    },
    async setAsDefault (scene) {
      const defaultScene = this.scenes.find(scene => scene.isDefault)
      if (defaultScene.id !== scene.id) {
        await scene.setAsDefault()

        defaultScene.isDefault = false
        scene.isDefault = true
      }
    },
    async receiveMessage (message) {
      const conversation = await Conversation.find(message.conversationId)
      const scene = this.scenes.find(scene => {
        return scene.id === conversation.sourceScene.id || 
          scene.id === conversation.targetScene.id
      })
      await scene.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .my-scenes {
    flex-grow: 1;
    flex-shrink: 1;
    overflow-y: auto;
  }

  .adding-scene {
    flex-grow: 0;
    flex-shrink: 0;
  }
}
</style>
