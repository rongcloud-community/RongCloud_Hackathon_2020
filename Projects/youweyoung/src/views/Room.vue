<template>
  <div>
    <section v-if="joined">
      <div>👨‍👨‍👦‍👦：{{ totalUser }}</div>
      <Stage ref="stage" />
      <div v-if="role === 1">观众视角</div>
      <div v-if="role === 2">[讲解员视角]</div>
      <button @click="leave">离开</button>
    </section>

    <div v-else>尝试加入中...</div>
  </div>
</template>

<script lang="ts">
import { RTCModule } from "@/store/rtc";
import { UserModule } from "@/store/user";
import Stage from "@/components/Stage.vue";
// @ is an alias to /src
import { rtc, Channel, sleep } from "@/utils";
import { Component, Vue, Watch } from "vue-property-decorator";

let room: any;
@Component({ name: "room", components: { Stage } })
export default class Room extends Vue {
  message: any;
  readonly channel = new Channel("room");
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
      }, 500);
      t = res;
    } catch (error) {
      this.broadcastBusy = false;
      console.error(error);
    }
    return t;
  }
  private created() {
    if (!rtc) {
      return this.$router.replace("/");
    }
    this.initRoom();
  }
  private mounted() {
    this.$refs.stage;
  }
  private async initRoom() {
    await this.join();
  }
  public async join(id = "test1") {
    if (this.joined) {
      return;
    }
    console.log(rtc);
    const e = new rtc.Room({
      // 音视频房间 Id
      id, // 设置房间 id  为 test
      joined: function (user: any) {
        console.log(user);
        console.log("join");
        // user.id 加入房间
      },
      left: function (user: any) {
        console.log(user);
        console.log("left");
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
      this.$message.error("加入房间失败");
      this.leave();
      return;
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
      this.totalUser = Object.keys(ans.users).length + 1;
    }
  }
  private messageHandler(message: {
    name: string;
    content: any;
    senderId: string;
  }) {
    const [action, payload] = message.name.split(":");
    switch (action) {
      case "C":
        this.$message.success(message.content.txt);
        break;
      case "U": {
        const data = JSON.parse(message.content);
        (this.$refs.stage as Stage).updateById(payload, data);
        break;
      }
      case "Char": {
        (this.$refs.stage as Stage).updateCharactors(
          message.content,
          message.senderId
        );
        break;
      }
      case "REVOKE": {
        const e = this.$refs.stage as any;
        e[payload].call(e, message.content);
        break;
      }
      default:
        break;
    }
  }
  public leave() {
    if (!room) {
      console.log("should join before leave");
    } else {
      room.leave();
    }
    this.$router.replace("/");
  }
}
</script>
