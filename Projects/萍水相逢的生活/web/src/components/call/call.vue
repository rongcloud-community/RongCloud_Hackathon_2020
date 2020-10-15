<template>
  <div>
    <f7-popup class="demo-popup" :opened="popupOpened">
      <f7-page>
        <div class="operating-area">
          <f7-block>
            <p>{{ prompt }}</p>
            <div class="buttons">
              <f7-button raised fill round large color="red" icon-f7="phone"
                @click="hungup" v-if="state !== 'none'">挂断</f7-button>
              <f7-button raised fill round large color="green" icon-f7="phone"
                @click="accept" v-if="state === 'coming'">接听</f7-button>
            </div>
          </f7-block>
        </div>

        <div ref="videos">
          <div class="video-target" ref="videoTarget"></div>
          <div class="video-me" ref="videoMe"></div>
        </div>
      </f7-page>
    </f7-popup>
  </div>
</template>

<script>
import { Scene } from 'models'

export default {
  name: 'Call',
  data () {
    return {
      popupOpened: false,
      state: 'none', // 可取值 none、connecting、comming、comunicating
      targetId: null, // 日后挂断用此 id
      invitingMessage: null, // 日后接听电话用此 message
      targetScene: null
    }
  },
  computed: {
    prompt () {
      switch (this.state) {
        case 'connecting': return "等待对方接听，请稍后"
        case 'coming': return "有电话来了，您的选择是"
        case 'communicating': return "正在通话中"
      }
    }
  },
  methods: {
    init () {
      const config = {
        timeout: 20000,
        RongIMLib: RongIMLib,
        RongRTC: RongRTC
      }
      this.rongCallLib = RongCallLib.init(config)

      /* 监听 Call */
      this.rongCallLib.videoWatch(async result => {
        console.log('videoWatch', result)
        if (result.type === 'added' && (result.talkType === 1 || result.talkType === 2)) {
          const videoNode = result.data
          videoNode.style = "width: 100%; height: 100%;"
          if (await this.isTarget(result.userId)) {
            this.$refs.videoTarget.append(videoNode)
          } else {
            this.$refs.videoMe.append(videoNode)
          }
        } else if (result.type === 'leave') {
          this.$refs.videoTarget.innerHTML = ''
          this.$refs.videoMe.innerHTML = ''
        }
      })
      this.rongCallLib.commandWatch(message => {
        console.log('commandWatch 中接收的消息', message)

        if (message.messageType === 'HungupMessage') {
          // 收到对方挂断电话的消息
          this.hungup(message)
        } else if (message.messageType === 'InviteMessage') {
          // 有电话来了，您是选择接听还是拒绝
          this.onInvite(message)
        } else if (message.messageType === 'AcceptMessage') {
          // 对方接听了电话
          this.state = 'communicating'
        }
      })

      console.log('初始化通话组件成功')
    },
    async isTarget (userId) {
      const targetId = this.targetId || this.invitingMessage.targetId
      const targetScene = await Scene.find(targetId)
      return targetScene.userId === parseInt(userId)
    },
    call (targetId,  type="audio") {
      this.state = 'connecting'
      this.popupOpened = true

      const params = {
        conversationType: RongIMLib.ConversationType.PRIVATE,
        targetId: targetId.toString(),
        mediaType: type === 'audio' ?
          RongIMLib.VoIPMediaType.MEDIA_AUDIO :
          RongIMLib.VoIPMediaType.MEDIA_VEDIO
      }
      this.rongCallLib.call(params, (error) => {
        if (error) {
          console.error('发起通话失败', error);
        } else {
          this.targetId = targetId
          console.log('发起通话成功')
        }
      })
    },
    hungup () {
      const targetId = this.targetId || this.invitingMessage.targetId
      const params = {
        conversationType: RongIMLib.ConversationType.PRIVATE,
        targetId: targetId.toString()
      }
      this.rongCallLib.hungup(params, error => {
        if (error) {
          console.error('挂断通话失败', error);
        } else {
          console.log('挂断通话成功')
        }

        this.state = 'none'
        this.targetId = this.invitingMessage = null
        this.popupOpened = false
      })
    },
    onInvite (message) {
      this.state = 'coming'
      this.invitingMessage = message
      this.popupOpened = true
    },
    accept () {
      const message = this.invitingMessage
      const params = {
        conversationType: message.conversationType,
        targetId: message.targetId,
        mediaType: message.content.mediaType
      }
      this.rongCallLib.accept(params, error => {
        if (error) {
          console.error('接听通话失败', error);
        } else {
          console.log('接听通话成功')

          this.state = 'communicating'
          this.targetId = message.targetId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-target {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
}

.video-me {
  position: fixed;
  top: 0;
  right: 0;
  width: 20vw;
  height: 20vh;
  z-index: -1;
}

.operating-area {
  position: fixed;
  bottom: 10vh;
  left: 10vw;
  width: 80vw;
  text-aligh: center;

  p {
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
  }
}
</style>
