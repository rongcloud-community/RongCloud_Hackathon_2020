<template>
  <div
    class="room-card"
    :key="config.roomId"
    :style="{ backgroundImage: config.bg }"
  >
    <h3 class="room-name">{{ config.name }}</h3>
    <p class="room-desc">{{ config.desc }}</p>
    <el-button
      class="room-join-btn"
      @click="join(config)"
      :disabled="!!config.forbid"
      round
    >
      <span><span class="mgr">加</span>入</span>
    </el-button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { rtc, sleep, Channel, deepCopy } from "@/utils";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({ name: "Theater" })
export default class Theater extends Vue {
  @Prop({
    default() {
      return {};
    },
  })
  config!: any;
  created() {
    if (!this.config) {
      this.$destroy();
    }
  }
  private join() {
    this.$emit("join", this.config);
  }
}
</script>

<style lang="scss" scoped>
.room-card {
  padding:1.5rem 1rem 1rem;
  background-color: white;
  margin: 1rem 1rem 0 0;
  flex: 1;
  min-width: 16rem;
  background-size: cover;
  display: flex;
  flex-direction: column;
  border-radius: 1rem 1rem 0 0;
  .room-name {
    background-color: rgba(240, 185, 6, 0.89);
    color: white;
    padding: 0.25rem;
    margin-top: 0;
  }
  .room-desc {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: left;
    text-indent: 2rem;
    padding: 0.25rem;
    flex: 1;
  }
  .room-join-btn {
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    color: rgb(63, 240, 18);
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
}
</style>