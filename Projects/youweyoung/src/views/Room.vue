<template>
  <div>
    <div v-if="!joined">尝试加入中...</div>
    <section>
      <div
        class="frow"
        style="justify-content: space-between; align-items: center"
      >
        <div>👨‍👨‍👦‍👦：{{ users.length }}</div>
        <div class="frow" v-if="isPlayer">
          <span style="margin-right: 8px">
            {{ published ? "在线" : "离线" }}</span
          >
          <el-button size="mini" @click="publish">连麦</el-button>
          <el-button size="mini" @click="unpublish">断开</el-button>
        </div>
        <button size="mini" @click="leave">离开</button>
      </div>
      <Stage ref="stage" :isPlayer="isPlayer" :config="roomInfo" />
    </section>
  </div>
</template>

<script lang="ts">
import { RTCModule } from "@/store/rtc";
import { UserModule } from "@/store/user";
import Stage from "@/components/Stage.vue";
import { loadRoomInfo } from "@/api";
// @ is an alias to /src
import { rtc, Channel, sleep } from "@/utils";
import { Component, Vue, Watch } from "vue-property-decorator";

let room: any;
let mediaStream: MediaStream;
let stream: any;
let stage: Stage;
@Component({ name: "room", components: { Stage } })
export default class Room extends Vue {
  message: any;
  readonly channel = new Channel("room");
  roomId!: string;
  roomInfo: any = {};
  published = false;
  sound: HTMLVideoElement = document.createElement("video");
  isPlayer = false;
  users: string[] = [];
  private get uid() {
    return UserModule.uid;
  }
  private get imstatus() {
    return RTCModule.imstatus;
  }
  private get role() {
    return UserModule.role;
  }
  private get canLeave() {
    return this.joined && this.imstatus === 0;
  }
  private joined = false;
  private broadcastBusy = false;
  private totalUser = 0;
  async broadcast(name: string, content: any, cb?: any) {
    if (!this.message) return;
    if (this.broadcastBusy) {
      this.$message.warning("操作过于频繁");
      return false;
    }
    this.broadcastBusy = true;
    let t: any = false;
    try {
      console.log({ name, content });
      const res = await this.message.send({ name, content });
      console.log(res);
      setTimeout(() => {
        this.broadcastBusy = false;
        if (typeof cb === "function") cb();
      }, 200);
      t = res;
    } catch (error) {
      this.broadcastBusy = false;
      console.error(error);
    }
    return t;
  }
  private created() {
    this.roomId = this.$route.query.roomId as string;
    if (!rtc || !this.roomId) {
      return this.$router.replace("/");
    }
  }
  private mounted() {
    this.initRoom();
  }
  private async initRoom() {
    const l = this.$loading({
      fullscreen: true,
    });
    await sleep(200);
    stage = this.$refs.stage as any;
    try {
      const e = await loadRoomInfo(this.roomId);
      if (!e) {
        this.leave();
        return;
      }
      this.isPlayer = e.players.includes(this.uid);
      this.roomInfo = e;
      const success = await this.join(this.roomId);
      if (success) {
        this.initAudio();
      }
    } catch (error) {}
    stage.initStage();
    l.close();
  }
  initAudio() {
    console.log("init audio");
    console.log(rtc);
    stream = new rtc.Stream({
      // 成员已发布资源，此时可按需订阅
      published: function (user: any) {
        console.log("new resource get------");
        console.log(user);
        stream
          .subscribe(user)
          .then((user: { id: any; stream: { tag: any; mediaStream: any } }) => {
            let {
              id,
              stream: { tag, mediaStream },
            } = user;
            // 订阅成功后会获取到对方媒体流，将媒体流添加到页面上的 video 节点即可展示对方音视频画面
            let node: HTMLAudioElement =
              document.querySelector(`audio#uplayer-${id}`) ||
              document.createElement("audio");
            node.autoplay = true;
            node.style.display = "none";
            node.srcObject = mediaStream;
            node.id = "uplayer-" + id;
            document.body.appendChild(node);
          });
      },
      // 成员已取消发布资源，此时需关闭流
      unpublished: function (user: { id: string }) {
        console.log("resource close");
        console.log(user);
        // 当对方成员取消订阅后，会自动触发此函数，此时己方取消订阅对方音视频流，然后做页面移除对方 video 节点即可
        stream.unsubscribe(user).then(function () {
          let node = document.getElementById(user.id);
          node?.remove();
        });
      },
    });
  }
  private publish() {
    if (!stream) {
      return this.$message.error("获取流失败");
    }
    stream
      .get({
        audio: true,
        video: false,
      })
      .then(
        (e: { mediaStream: MediaStream }) => {
          stream
            .publish({
              id: UserModule.uid,
              stream: {
                tag: "RongCloudRTC",
                type: rtc.StreamType.AUDIO,
                mediaStream: e.mediaStream,
              },
            })
            .then(
              () => {
                console.log("发布成功");
                this.published = true;
              },
              (error: any) => {
                if (error?.code === 50003) {
                  this.$message.error("请重新进入房间");
                  this.leave();
                }
              }
            );
        },
        (error: any) => {
          console.error("error get stream");
          console.error(error);
        }
      );
  }
  private unpublish() {
    stream
      .unpublish({
        id: this.uid,
        stream: {
          tag: "RongCloudRTC",
          type: rtc.StreamType.AUDIO,
        },
      })
      .then(
        () => {
          this.published = false;
          console.log("取消发布成功");
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  private beforeDestroy() {
    // stream.unsubscribe()
    document.body.querySelectorAll("audio").forEach((e) => e.remove());
    if (!room) {
      console.log("should join before leave");
    } else {
      room.leave();
    }
  }
  public async join(id = "test1") {
    if (this.joined) {
      return true;
    }
    const e = new rtc.Room({
      // 音视频房间 Id
      id, // 设置房间 id  为 test
      joined: (user: any) => {
        const i = this.users.findIndex((el) => el === user.id);
        if (i < 0) {
          this.users.push(user.id);
        }
        console.log(user);
        // user.id 加入房间
      },
      left: (user: any) => {
        console.log(user);
        const i = this.users.findIndex((el) => el === user.id);
        if (i > -1) {
          this.users.splice(i, 1);
        }
        // user.id 离开房间
      },
    });
    try {
      await e.join({
        id: this.uid,
      });
      room = e;
      this.joined = true;
    } catch (error) {
      console.error(error);
      this.$message.error("加入房间失败");
      this.leave();
      return false;
    }
    this.message = Object.freeze(
      new rtc.Message({
        received: this.messageHandler,
      })
    );
    const ans = await this.broadcast(UserModule.role === 2 ? "C" : "Nonce", {
      txt: `演播员${UserModule.nickname}上线啦！！`,
    });
    if (ans) {
      this.users = [...Object.keys(ans.users), this.uid];
    }
    return true;
  }
  private messageHandler(message: {
    name: string;
    content: any;
    senderId: string;
  }) {
    console.log("handler methods ");
    const [action, payload] = message.name.split(":");
    switch (action) {
      case "C":
        this.$message.success(message.content.txt);
        break;
      case "U": {
        const data = JSON.parse(message.content);
        stage?.updateById(payload, data);
        break;
      }
      case "Char": {
        stage?.updateCharactors(message.content, message.senderId);
        break;
      }
      case "REVOKE": {
        if (stage) (stage as any)[payload].call(stage, message.content);
        break;
      }
      default:
        break;
    }
  }
  public leave() {
    (this.$refs.stage as Stage).reset();
    this.$router.go(-1);
  }
}
</script>
