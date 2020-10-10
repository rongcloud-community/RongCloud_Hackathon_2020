<template>
  <div id="app">
    <!-- <Stage /> -->
    <div>Message:{{ message }};Status:{{ imstatus }}</div>
    <router-view />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Stage from "@/components/Stage.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { RTCModule } from "./store/rtc";
import { SimDB } from "./utils";

@Component({ name: "home",components:{Stage} })
export default class App extends Vue {
  private created() {
    const db = new SimDB();
    const user = db.get("user");
    if (!user) {
      console.log("to logon");
      this.$router.replace("/logon");
    }
  }
  private get message() {
    return RTCModule.message;
  }
  private get imstatus() {
    return RTCModule.imstatus;
  }
  private async initSDK() {}
}
</script>

<style lang="scss">
@import url("style/basic.css");
#app {
  display:flex;
  font-family: Arial, "Song", Helvetica, sans-serif;
  text-align: center;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  background-color:lightgrey;
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: stretch;
  flex: 1;
}
</style>
