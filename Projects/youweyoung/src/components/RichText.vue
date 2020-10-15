<template>
  <yuhj-img v-if="img" :src="t[1]" />
  <div v-else-if="html" v-html="t[1]" />
  <component v-else :is="t[0]" :title="t[1]">{{ t[1] }}</component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
const item = {};

@Component({ name: "RichText" })
export default class extends Vue {
  @Prop({ required: true }) public data!: string;
  @Prop({ default: "p" }) public def!: string;
  get t() {
    const t = this.data.slice(0, 5).indexOf(":");
    if (t < 1) {
      return [this.def, this.data];
    }
    const el = this.data.slice(0, t);
    const cont = this.data.slice(t + 1);
    return [el, cont];
  }
  get html() {
    return this.t[0] === "html";
  }
  get img() {
    return this.t[0] === "img";
  }
}
</script>
