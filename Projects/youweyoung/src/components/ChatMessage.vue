 <template>
  <section ref="msgZone" class="message-zone">
    <div v-if="fMessages.length === 0">房间还没任何消息，发一条吧</div>
    <div v-for="msg in fMessages" class="message-box" :key="msg.id">
      <div v-if="msg.systemMsg"></div>
      <div class="message-wrapper" :class="{ mine: msg.isMine }" v-else>
        <img class="mini-avatar" :src="msg.avatar" alt />
        <div style="margin: 0 8px; align-items: flex-start" class="fcol">
          <div
            class="frow bd1b"
            style="align-items: flex-end"
            :class="{ send: msg.isMine }"
          >
            <span class="mini-nickname">{{ msg.nickname }}</span>
            <span class="date tkeep">{{ msg.date }}</span>
          </div>
          <RichText def="div" class="message" :data="msg.data" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// @ is an alias to /src
import { rtc, sleep, Channel, deepCopy } from "@/utils";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import RichText from "./RichText.vue";
const test = {
  data: "content-body",
  avatar: "",
  senderId: "",
  senderName: "233",
  senderAvatar: "",
  type: "text",
};
@Component({ name: "ChatMessage", components: { RichText } })
export default class ChatMessage extends Vue {
  @Prop({
    default() {
      return [];
    },
  })
  messages!: any;
  @Prop({ default: "" })
  uid!: string;
  @Prop({
    default() {
      return [];
    },
  })
  members!: any[];
  get fMessages() {
    return this.messages.map((el: any) => {
      const n = {};
      console.log(this.uid);
      return Object.assign({}, el, {
        isMine: el.sender === this.uid,
        systemMessage: el.type === "system",
        textMessage: el.type === "text",
        imageMessage: el.type === "image",
        emojMessage: el.type === "emoj",
        avatar: "./static/resources/images/avatar/" + el.avatar,
        date: new Date().toLocaleTimeString(),
      });
    });
  }
  mounted() {
    console.log(this.fMessages);
  }
  @Watch("fMessages")
  scrollToBottom(nv: any[], ov: any[]) {
    this.$nextTick(() => {
      var container = this.$el;
      container!.scrollTop = container!.scrollHeight;
    });
  }
}
</script>

<style lang="scss" scoped>
.message-zone {
  align-items: stretch;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  min-height: 2rem;
  .message-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .message-wrapper {
    max-width: 80%;
    /* border: 1px solid gray; */
    display: flex;
    margin-top: 0.25rem;
    padding: 0.25rem;
    border: 1px solid lightgrey;
    border-radius: 0.25rem;
    word-wrap: wrap;
    word-break: break-all;
    text-align: left;
    color: black;
    flex-direction: row;
    &.mine {
      flex-direction: row-reverse;
      align-self: flex-end;
      background-color: aquamarine;
    }
    .date {
      margin-left: 10px;
    }
    .send {
      align-self: flex-end;
    }
    .message {
      max-width: 100%;
      font-size: 1rem;
      font-weight: 600;
      margin: 0.5rem 0px;
    }
    .mini-avatar {
      width: 2rem;
      height: 2rem;
      border: 1px solid grey;
      background-color: grey;
      flex-shrink: 0;
      flex-grow: 0;
    }
    .mini-nickname {
      font-size: 0.8rem;
      text-align: right;
    }
  }
}
</style>