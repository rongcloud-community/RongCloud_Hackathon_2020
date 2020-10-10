<template>
  <div>
    <canvas id="stage" :style="{ height }"></canvas>
    <section v-if="isPlayer">
      <div>
        <el-radio-group @change="chooseCharactor" v-model="myCharactorId">
          <el-radio-button label="暂无"></el-radio-button>
          <el-radio-button
            v-for="cha in chars"
            :key="cha.id"
            :label="cha.name"
            :disabled="cha.picked"
          ></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="hasPlayer">
        <div>
          <el-button @click="moveTo({ y: -100 })"> W </el-button>
          <el-button @click="moveTo({ x: -100 })"> A </el-button>
          <el-button @click="moveTo({ y: 100 })"> S </el-button>
          <el-button @click="moveTo({ x: 100 })"> D </el-button>
          <el-button @click="flip({ dir: 0 })"> M </el-button>
        </div>
        <div>
          <el-button
            @click="play({ name: ani })"
            v-for="ani in animations"
            :key="'act_' + ani"
          >
            {{ ani }}
          </el-button>
        </div>
      </div>
      <el-button @click="clear">清空</el-button>
    </section>
  </div>
</template>

<script lang="ts">
import { RTCModule } from "@/store/rtc";
import { UserModule } from "@/store/user";
import { Application } from "pixi.js";
// @ is an alias to /src
import { rtc, sleep, Channel } from "@/utils";
import * as dragonBones from "dragonBones";
import { loadScript } from "@/api";
import { Charactor } from "./Charactor";
import { Component, Vue, Watch } from "vue-property-decorator";
import RoomView from "../views/Room.vue";
import { users } from "@/api/mock/data";
let room: any;
let player: Charactor | null = null;
@Component({ name: "Stage" })
export default class Stage extends Vue {
  storage: any;
  charactorsPicked: any[] = [];
  get height() {
    return Math.round((screen.availWidth / 16) * 9);
  }
  hasPlayer = false;
  animations: string[] = [];
  app?: Application;
  walking = false;
  charactors: any[] = [];
  busy = false;
  get isPlayer() {
    return UserModule.role === 2;
  }
  syncData<T = any>(key: string, def?: T): Promise<T> {
    return new Promise((res) => {
      this.storage?.get(key).then((v: any) => {
        console.log(`value of ${key} ------------- `);
        console.log(v);
        res(!!v[key] ? JSON.parse(v[key]) : def);
      });
    });
  }
  clear() {
    this.storage.remove("charactors");
    // this.updateData('charators',[],{})
    setTimeout(() => {
      this.syncData("charactors").then((v) => console.log(v));
    }, 2000);
    console.clear();
  }
  updateData(key: string, val: any, message?: any) {
    console.log(`set of ${key} ------------- `);
    console.log(val);
    this.storage?.set(key, JSON.stringify(val), message);
  }
  async chooseCharactor(e: any) {
    this.busy = true;
    const charactorsPicked = await this.syncData<any[]>("charactors", []);
    if (e === "暂无") {
      if (player) {
        player.destory();
        player = null;
        const i = charactorsPicked.findIndex((e) => e.uid === UserModule.uid);
        charactorsPicked.splice(i, 1);
        this.updateData("charactors", charactorsPicked, {
          name: `Char:`,
          content: `0`,
        });
        this.charactorsPicked = charactorsPicked;
      }
      this.hasPlayer = false;
      return;
    }
    console.log(`---- start pick charactor ${e} --- `);
    console.log(charactorsPicked);
    const oi = charactorsPicked.findIndex((e1) => e1.name === e);
    if (oi > -1) {
      return this.$message.error("角色已经被别人选取了哦");
    }
    const el = this.charactors.find((e1) => e1.name === e);
    const c = await Charactor.create({ ...el, uid: UserModule.uid });
    if (!c) {
      return;
    }
    const i = charactorsPicked.findIndex((el) => el.uid === UserModule.uid);
    if (i > -1) {
      charactorsPicked.splice(i, 1);
      player?.destory();
      console.log("replace-----");
    }
    charactorsPicked.push({
      uid: UserModule.uid,
      ...c.metadata,
    });
    this.updateData("charactors", charactorsPicked, {
      name: `Char:`,
      content: `${i > -1 ? 2 : 1}`,
    });
    this.charactorsPicked = charactorsPicked;
    player = c;
    this.hasPlayer = true;
    this.animations = Array.from(player.animationNames);
    this.busy = false;
  }
  myCharactorId: string = "暂无";
  private mounted() {
    Charactor.app = new Application({
      view: document.querySelector("canvas#stage") as HTMLCanvasElement,
    });
    loadScript().then((doc) => {
      this.charactors = doc.charactors;
    });
    this.storage = new rtc.Storage();
    console.log(UserModule);
  }
  get chars() {
    return this.charactors.map((el) => {
      el.picked = this.charactorsPicked.some((e) => e.config.id === el.id);
      return el;
    });
  }
  updateById(id: string, data: any[]) {}
  async updateCharactors(type: "0" | "1" | "2", uid: string) {
    const charactors = await this.syncData<any[]>("charactors", []);
    const el = charactors.find((el) => el.uid === uid);
    this.charactorsPicked = charactors;
    if (type == "2") {
      const e = Charactor.list.find((el) => el.config.uid === uid);
      e?.replace(el.config);
      console.log("-----replace------");
      console.log(e);
      return;
    } else if (type == "0") {
      const e = Charactor.list.find((el) => el.config.uid === uid);
      e?.destory();
      return;
    }
    await Charactor.create(el.config);
  }
  async flip({ stop = false, dir = 0, uid = "" }) {
    console.log(`flip with ${stop} ${dir} ${uid} `);
    if (!stop) {
      const s = await (this.$parent as RoomView).broadcast("REVOKE:flip", {
        stop: true,
        uid: UserModule.uid,
      });
      if (!s) {
        return;
      }
      player?.flip({ dir });
      return;
    }
    const char = Charactor.list.find(
      (el) => el.config.uid === (uid || UserModule.uid)
    );
    console.log(char);
    char?.flip({ dir });
  }
  async power({ x = 0, y = 0, stop = false, uid = "", rotate = 0 }) {
    x = x || 0;
    y = y || 0;
    uid = uid || UserModule.uid;
    if (!stop) {
      const s = await (this.$parent as RoomView).broadcast("REVOKE:power", {
        stop: true,
        uid,
        x,
        y,
        rotate,
      });
      if (!s) {
        return;
      }
      player?.power({ x, y, rotate });
      return;
    }
    Charactor.list.find((el) => el.config.uid === uid)?.power({ x, y, rotate });
  }
  async play({ name = "", uid = "", stop = false }) {
    console.log(`play with ${name} `);
    if (!stop) {
      const s = await (this.$parent as RoomView).broadcast("REVOKE:play", {
        stop: true,
        name,
        uid: UserModule.uid,
      });
      if (!s) {
        return;
      }
      player?.play({ name });
      return;
    }
    Charactor.list
      .find((el) => el.config.uid === (uid || UserModule.uid))
      ?.play({ name });
  }
  async moveTo({
    x = undefined as number | undefined,
    y = undefined as number | undefined,
    stop = false,
    time = 2,
    uid = "",
  }) {
    console.log(`moveTo ${x} ${y} ${stop} `);
    if (!stop) {
      if (typeof x === "number") {
        x = player!.x + x;
      }
      if (typeof y === "number") {
        y = player!.y + y;
      }
      const s = await (this.$parent as RoomView).broadcast("REVOKE:moveTo", {
        stop: true,
        uid: UserModule.uid,
        x,
        y,
        time,
      });
      if (!s) {
        return;
      }
      player?.moveTo({ x, y, time });
      return;
    }
    const char = Charactor.list.find((el) => el.config.uid === uid);
    console.log(char);
    char?.moveTo({ x, y, time });
  }
  beforeDestory() {
    const n = this.charactorsPicked.filter((e) => e.uid !== UserModule.uid);
    this.updateData("charactors", n, {
      name: "Char",
      content: "0",
    });
    player?.destory();
    player = null;
  }
}
</script>

<style lang="scss" scoped>
#stage {
  width: 100%;
  background-color: black;
}
</style>
