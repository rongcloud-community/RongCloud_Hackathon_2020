<template>
  <f7-page name="update-scene">
    <f7-navbar back-link="返回">
      <f7-nav-title>更新场景</f7-nav-title>
    </f7-navbar>

    <f7-list no-hairlines-md>
      <f7-list-input
        label="场景名称"
        type="text"
        validate
        required
        :value="editingScene.name"
        @input="editingScene.name = $event.target.value"
      />
      <f7-list-input
        label="场景号"
        type="text"
        :value="editingScene.number"
        @input="editingScene.number = $event.target.value"
        :error-message="editingSceneErrors.number"
        :error-message-force="'number' in editingSceneErrors"
      />
      <f7-list-input
        label="使用昵称"
        type="text"
        validate
        required
        :value="editingScene.nickname"
        @input="editingScene.nickname = $event.target.value"
      />
      <f7-list-input
        label="使用头像（点击选择）"
        :input="false"
      >
        <ImageUploader slot="input" @uploaded="editingScene.avatar = $event.url">
          <img :src="editingScene.avatar" width="66" height="66" />
        </ImageUploader>
      </f7-list-input>
    </f7-list>
    <f7-block class="row">
      <f7-col>
        <f7-button raised color="red" @click="deleteScene">删除</f7-button>
      </f7-col>
      <f7-col>
        <f7-button raised color="green" @click="updateScene">更新</f7-button>
      </f7-col>
    </f7-block>
  </f7-page>
</template>

<script>
import { Scene } from '@/models'
import OssLib from '@/js/oss-lib'
import ImageUploader from '@/components/image-uploader'

export default {
  name: 'EditScenePage',
  components: {
    ImageUploader
  },
  data () {
    return {
      originalNumber: null,
      editingScene: {},
      editingSceneErrors: {}
    }
  },
  async mounted () {
    const sceneId = parseInt(this.$f7route.params.id)
    const scene = await Scene.find(sceneId)
    this.editingScene = scene

    this.originalNumber = this.editingScene.number
  },
  methods: {
    async updateScene () {
      if (this.originalNumber !== this.editingScene.number
          && !/^[a-zA-Z]\w*$/.test(this.editingScene.number)) {
        this.editingSceneErrors = {
          number: '自定义场景号只能使用字母和数字，并且开头一定得是字母'
        }
        return
      }

      try {
        await this.editingScene.save()
        this.sourceScene = this.editingScene
        this.editingSceneErrors = {}
        this.$f7router.back()
        this.$f7.toast.show({
          text: '更新成功',
          position: 'center',
          closeTimeout: 2000,
        })
      } catch (e) {
        if (e.response && e.response.data.code === 'resource_invalid') {
          this.editingSceneErrors = e.response.data.detail
        } else {
          throw e
        }
      }
    },
    async deleteScene () {
      this.$f7.dialog.confirm('你确定要删除此场景吗？该操作目前不可恢复！', async () => {
        await this.editingScene.destroy()
        this.$f7router.navigate({ name: 'scenes' })
        this.$f7.toast.show({
          text: '删除成功',
          position: 'center',
          closeTimeout: 2000,
        })
      })
    }
  }
}
</script>
