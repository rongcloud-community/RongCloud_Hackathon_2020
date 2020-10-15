<template>
  <div id="app">
    <Header />
    <div class="info">
      Message:{{ message }};Status:{{ imstatus }}
    </div>
    <router-view class="ctx-body" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { RTCModule } from "./store/rtc";
import { UserModule } from "./store/user";
import { SimDB } from "./utils";

@Component({ name: "home", components: { Header } })
export default class App extends Vue {
  private created() {
    UserModule.init();
  }
  private get canConnect() {
    return UserModule.role > 0 && this.imstatus === 1;
  }
  private get message() {
    return RTCModule.message;
  }
  private get imstatus() {
    return RTCModule.imstatus;
  }
  private async connect() {
    await RTCModule.getCert(UserModule.uid);
  }
  private async initSDK() {}
}
</script>

<style lang="scss">
@import url("style/basic.css");
#app {
  display: flex;
  font-family: Arial, "Song", Helvetica, sans-serif;
  text-align: center;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  background-color: lightgrey;
  .info {
    background-color: chartreuse;
    color: white;
    font-size: 0.8rem;
    width: 100%;
    border-bottom: 1px solid white;
  }
  .ctx-body {
    flex: 1;
    max-width: 60rem;
    background-color: skyblue;
    width: 100%;
  }
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: stretch;
  flex: 1;
}
</style>
