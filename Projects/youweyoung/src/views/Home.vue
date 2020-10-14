<template>
  <div class="home">
    <div class="room-list">
      <RoomCard
        class="room-card"
        v-for="room in roomsProcessed"
        :key="room.roomId"
        :config="room"
        @join="join"
      >
      </RoomCard>
    </div>
    <el-button @click="connect" v-if="imstatus === 2">连接</el-button>
  </div>
</template>

<script lang="ts">
import { RTCModule } from "@/store/rtc";
import { UserModule } from "@/store/user";
import { loadRoomList } from "@/api";
import RoomCard from "@/components/RoomCard.vue";
// @ is an alias to /src

import { Component, Vue, Watch } from "vue-property-decorator";

@Component({ name: "home", components: { RoomCard } })
export default class Home extends Vue {
  private get uid() {
    return UserModule.uid || "未登录";
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
    if (UserModule.hasLogon) this.connect();
    loadRoomList(0, 10).then((e) => {
      if (Array.isArray(e)) {
        this.rooms = e;
      }
      console.log(this.roomsProcessed);
    });
  }
  private get roomsProcessed() {
    return this.rooms;
  }
  private async connect() {
    await RTCModule.getCert(this.uid);
    await RTCModule.init();
    console.log(RTCModule);
  }
  private async join(e: any) {
    if (!UserModule.hasLogon) {
      this.$message.warning("请先登录");
      return this.$router.push("/logon");
    }
    if (e.password) {
      const t = prompt("请输入房间密码");
      if (t !== e.password) {
        return this.$message.error("密码错误");
      }
    }
    if (this.imstatus !== 0) {
      return this.$alert("连接服务器失败，请刷新页面后重试");
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
  }
  .mgr {
    margin-right: 2rem;
  }
}
</style>
