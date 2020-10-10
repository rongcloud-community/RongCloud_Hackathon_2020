<template>
  <f7-page name="conversation">
    <f7-navbar back-link="返回">
      <span slot="title">与 {{ targetScene.nickname }} 沟通中</span>
    </f7-navbar>

    <f7-photo-browser
      :routable-modals="true"
      :navbar="true"
      :toolbar="currentShowImages.length > 1"
      :exposition="false"
      :photos="currentShowImages"
      ref="imagePreviewer"
    ></f7-photo-browser>

    <f7-messages
      :scroll-messages="false"
      ref="messages"
    >
      <infinite-loading direction="top" @infinite="infiniteHandler"></infinite-loading>
      <template
        v-for="message, index in messages"
      >
      <f7-messages-title :key="`title-${message.id}`"v-if="isShowTimes[index]">
        {{ message.time | accordingToNow }}
      </f7-messages-title>
      <f7-message :key="`message-${message.id}`" :type="message.direction">
          <span slot="text" v-if="message.type === 'text'">{{ message.body.text }}</span>
          <img v-if="message.type === 'image'" 
               slot="image" 
               :src="message.body.url"
               @click="showImage(message)"
               :style="getImageSize(message)"
          />
        </f7-message>
      </template>
    </f7-messages>

    <f7-messagebar
      placeholder="Message"
      ref="messagebar"
      @keypress.enter.native.prevent="sendText"
    >
      <input ref="imageSelect" v-show="false"
             type='file' accept="image/*;capture=camera" 
             @change="handleImagesChange">
      <f7-link
        icon-ios="f7:plus_circle_fill"
        icon-aurora="f7:plus_circle_fill"
        icon-md="material:plus_circle_fill"
        slot="inner-start"
        @click="$refs.actions.open()"
      ></f7-link>
      <f7-link
        icon-ios="f7:arrow_up_circle_fill"
        icon-aurora="f7:arrow_up_circle_fill"
        icon-md="material:send"
        slot="inner-end"
        @click="sendText"
      ></f7-link>
    </f7-messagebar>

    <f7-actions ref="actions">
      <f7-actions-group>
        <f7-actions-button @click="call('audio')">语音通话</f7-actions-button>
        <f7-actions-button @click="call('video')">视频通话</f7-actions-button>
        <f7-actions-button @click="$refs.imageSelect.click()">发送图片</f7-actions-button>
      </f7-actions-group>
      <f7-actions-group>
        <f7-actions-button color="red">Cancel</f7-actions-button>
      </f7-actions-group>
    </f7-actions>
  </f7-page>
</template>

<script>
import differenceInMinutes from 'date-fns/differenceInMinutes'
import InfiniteLoading from 'vue-infinite-loading'
import { Conversation, Message } from '@/models'
import MessageLib from '@/js/message-lib'
import OssLib from '@/js/oss-lib'
import { accordingToNow } from '@/js/filters'
import { handleUploadImageEvent } from '@/js/image-utils'

export default {
  name: 'ConversationPage',
  filters: {
    accordingToNow
  },
  components: {
    InfiniteLoading
  },
  data () {
    return {
      conversation: {},
      messages: [],
      dialing: false,
      isShowTimes: [],
      currentShowImages: []
    }
  },
  computed: {
    sourceId () {
      return this.conversation.sourceScene.id
    },
    targetScene () {
      return (this.conversation && this.conversation.targetScene) || {}
    },
    targetId () {
      return this.targetScene && this.targetScene.id
    },
    targetIdInRongCloud () {
      return this.targetId && this.targetId.toString()
    }
  },
  watch: {
    messages: {
      handler (messages) {
        let lastTime = new Date(0)
        this.isShowTimes = messages.map(message => {
          const messageTime = new Date(message.time)
          if (differenceInMinutes(messageTime, lastTime) > 10) {
            lastTime = messageTime
            return true
          } else {
            return false
          }
        })
      },
      deep: true
    }
  },
  async mounted () {
    window.$this = this
    this.conversationId = parseInt(this.$f7route.params.id)
    this.conversation = await Conversation.find(this.conversationId)

    // 首次进入设置阅读时间
    if (this.conversation.unreadCount > 0) {
      this.conversation.read()
    }

    MessageLib.addListener(this.receiveMessage)
  },
  async beforeDestroy () {
    await this.conversation.read()

    MessageLib.removeListener(this.receiveMessage, 
      () => console.log('Chat页：删除消息监听器成功'),
      () => console.error('Chat页：删除消息监听器出错')
    )
  },
  methods: {
    async infiniteHandler ($state) {
      const messages = await Message.list({
        conversationId: this.conversationId,
        messageIdBefore: this.messages[0] && this.messages[0].id,
        perPage: 20
      })

      if (messages.length > 0) {
        let isFirstFetch = this.messages.length === 0
        this.messages.unshift(...messages.reverse())
        // 不知为啥，某些情况下加载消息后无法让滚动条完全到达底部，因而用了以下方法修复。
        if (isFirstFetch) {
          setTimeout(this.scrollToBottom, 100)
        }
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    showImage (message) {
      this.currentShowImages = [{
        url: message.body.url
      }]
      this.$nextTick(() => this.$refs.imagePreviewer.open())
    },
    async sendMessage ({ type, body }) {
      // 首先发送消息到自己的服务器
      const message = await Message.send({
        type,
        body,
        conversationId: this.conversationId
      })
      this.messages.push(message)

      // 然后发送消息到融云 Cloud
      MessageLib.sendToRongCloud(this.targetScene.userId, message)

      this.scrollToBottom()
    },
    async sendText () {
      const text = this.$refs.messagebar.getValue()
      if (!text) {
        return
      }

      await this.sendMessage({ type: 'text', body: text })
      this.$refs.messagebar.clear()
      this.$refs.messagebar.focus()
    },
    async sendImage (remoteImage) {
      await this.sendMessage({ type: 'image', body: remoteImage })
    },
    handleImagesChange (event) {
      handleUploadImageEvent(event, remoteImage => this.sendImage(remoteImage))
    },
    receiveMessage (message) {
      console.log('收到消息', message)
      if (message.conversationId !== this.conversationId) {
        console.log('跳过', message)
        return
      }

      const text = message.text
      const time = new Date(message.time)
      this.messages.push(message)
      this.scrollToBottom()
    },
    call (type = 'audio') {
      const platform = this.$store.state.platform
      if (platform === 'android') {
        jsToAndroid.call(this.targetScene.userId, type)
      } else if (platform === 'ios') {
        webkit.messageHandlers.rongCloud.postMessage({ 
          action: 'call',
          data: { 
            targetUserId: this.targetScene.userId,
            type
          }
        })
      } else {
        this.$callStart(this.targetScene.userId, type)
      }
    },
    scrollToBottom () {
      this.$nextTick(() => this.$refs.messages.scroll(0, Number.SAFE_MAX_INTEGER))
    },
    getImageSize (message) {
      const maxWidth = window.innerWidth * 0.7
      const size = message.body.size

      const width = Math.min(maxWidth, size[0])
      const height = (size[1] / size[0]) * width
      return { width: width + 'px', height: height + 'px' }
    }
  }
}
</script>
