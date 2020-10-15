<template>
  <section class="rich-input frow pd">
    <textarea
      v-model="text"
      class="f1 mgr"
      name=""
      id=""
      cols="30"
      rows="4"
    ></textarea>
    <el-button icon="el-icon-picture-outline mgr" circle></el-button>
    <el-button icon="el-icon-s-promotion" @click="send"></el-button>
  </section>
</template>

<script lang="ts">
// @ is an alias to /src
import { rtc, sleep, Channel, deepCopy } from "@/utils";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({ name: "DirPanel" })
export default class DirPanel extends Vue {
  text: string = "";
  private send() {
    this.$emit("send", this.text);
  }
  reset(){
    this.text = ""
  }
}
</script>

<style lang="scss" scoped>
.rich-input {
  width: 100%;
  align-items: flex-start;
  .mgr {
    margin-right: 0.5rem;
  }
  textarea {
    resize: none;
  }
}
</style>