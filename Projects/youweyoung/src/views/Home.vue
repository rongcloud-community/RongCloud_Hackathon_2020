<template>
  <div class="home">
    <div class="room-list">
      <div
        class="room-card"
        v-for="room in roomsProcessed"
        :key="room.roomId"
        :style="{ backgroundImage: room.bg }"
      >
        <h3 class="room-name">{{ room.name }}</h3>
        <p class="room-desc">{{ room.desc }}</p>
        <el-button
          class="room-join-btn"
          @click="join(room)"
          :disabled="!!room.forbid"
        >
          <span><span class="mgr">加</span>入</span>
        </el-button>
      </div>
    </div>
    <el-button @click="connect" v-if="imstatus === 2">连接</el-button>
  </div>
</template>

<script lang="ts">
import { RTCModule } from "@/store/rtc";
import { UserModule } from "@/store/user";
import { loadRoomList } from "@/api";
// @ is an alias to /src

import { Component, Vue, Watch } from "vue-property-decorator";

@Component({ name: "home" })
export default class Home extends Vue {
  private get uid() {
    return UserModule.uid;
  }
  private joined = false;
  private rooms: any[] = [];
  private get connectedIM() {
    return this.imstatus === 0;
  }
  private get imstatus() {
    return RTCModule.imstatus;
  }
  created() {
    this.connect();
    loadRoomList(0, 10).then((e) => {
      if (Array.isArray(e)) {
        this.rooms = e;
      }
      console.log(this.roomsProcessed);
    });
  }
  private get roomsProcessed() {
    return this.rooms.map((el) => {
      (el as any).forbid = this.imstatus !== 0;
      return el;
    });
  }
  private async connect() {
    await RTCModule.getCert(this.uid);
    await RTCModule.init();
    console.log(RTCModule);
  }
  private async join(e: any) {
    console.log(e)
    if (e.password) {
      const t = prompt("请输入房间密码");
      if (t !== e.password) {
        return this.$message.error("密码错误");
      }
    }
    this.$router.push(`/room?roomId=${e.roomId}`);
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 1rem;
  .room-list {
    display: flex;
    padding: 1rem 0;
    flex-wrap: wrap;
    .room-card {
      padding: 1rem;
      background-color: white;
      margin: 1rem 1rem 0 0;
      flex: 1;
      min-width: 16rem;
      background-size: cover;
      display: flex;
      flex-direction: column;
      .room-name {
        background-color: rgba(240, 185, 6, 0.89);
        color: white;
        padding: 0.25rem;
        margin-top: 0;
      }
      .room-desc {
        background-color: rgba(255, 255, 255, 0.4);
        text-align: left;
        text-indent: 2rem;
        padding: 0.25rem;
        flex: 1;
      }
      .room-join-btn {
        background-color: rgba(51, 235, 235, 0.49);
        border: none;
        color: black;
        font-weight: bold;
        display: flex;
        justify-content: center;
      }
    }
  }
  .mgr {
    margin-right: 2rem;
  }
}
</style>
