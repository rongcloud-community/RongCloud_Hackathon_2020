<template>
  <div class="dir-panel">
    <div class="frow f1">
      <div class="f1"></div>
      <el-button
        @click="$emit('tap', 'up')"
        circle=""
        class="el-icon el-icon-caret-top"
      ></el-button>
      <div class="f1"></div>
    </div>
    <div class="frow f1">
      <el-button
        circle=""
        @click="$emit('tap', 'left')"
        class="el-icon el-icon-caret-left"
      ></el-button>
      <el-button
        circle=""
        @click="$emit('tap', 'middle')"
        class="el-icon el-icon-refresh"
      ></el-button>
      <el-button
        circle=""
        @click="$emit('tap', 'right')"
        class="el-icon el-icon-caret-right"
      ></el-button>
    </div>
    <div class="frow f1">
      <div class="f1"></div>
      <el-button
        circle=""
        @click="$emit('tap', 'down')"
        class="el-icon el-icon-caret-bottom"
      ></el-button>
      <div class="f1"></div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { rtc, sleep, Channel, deepCopy } from "@/utils";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({ name: "DirPanel" })
export default class DirPanel extends Vue {}
</script>

<style lang="scss" scoped>
.dir-panel {
  width: 136px;
  height: 136px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px;
  .el-icon {
    margin: 0;
  }
}
</style>