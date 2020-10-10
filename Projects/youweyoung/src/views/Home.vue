<template>
  <div class="home">
    <div>
      {{ uid }}
      <el-button @click="connect" v-if="!connectedIM">连接</el-button>
    </div>
    <div v-if="connectedIM">
      <el-button @click="join">加入</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { RTCModule } from "@/store/rtc";
import { UserModule } from "@/store/user";
// @ is an alias to /src

import { Component, Vue, Watch } from "vue-property-decorator";

@Component({ name: "home" })
export default class Home extends Vue {
  private get uid() {
    return UserModule.uid;
  }
  private joined = false;
  private get connectedIM() {
    return RTCModule.imstatus === 0;
  }
  private async connect() {
    await RTCModule.getCert(this.uid);
    await RTCModule.init();
    console.log(RTCModule);
  }
  private async join() {
    this.$router.push("/room");
  }
}
</script>
