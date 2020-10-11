<template>
  <div>
    <canvas
      id="mainCanvas"
      :style="{ height }"
      :width="canvasPixelWidth"
      height="450"
    ></canvas>
    <section v-if="isPlayer" class="controller pd">
      <div class="frow">
        <el-radio-group @change="chooseCharactor" v-model="myCharactorName">
          <el-radio-button label="暂无"></el-radio-button>
          <el-radio-button
            v-for="cha in chars"
            :key="cha.id"
            :label="cha.name"
            :disabled="cha.picked"
          ></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="hasPlayer" class="mgt">
        <div class="frow">
          <DirPanel @tap="handleMove" />
          <div class="ani-picker">
            <el-button
              @click="play({ name: ani })"
              v-for="ani in animations"
              :key="'act_' + ani"
              size="mini"
            >
              {{ ani }}
            </el-button>
          </div>
        </div>
      </div>
      <!-- <el-button @click="clear">清空</el-button> -->
    </section>
  </div>
</template>

<script lang="ts">
import { RTCModule } from "@/store/rtc";
import { UserModule } from "@/store/user";
import { Application, Graphics, Rectangle, Container } from "pixi.js";
// @ is an alias to /src
import { rtc, sleep, Channel, deepCopy } from "@/utils";
import * as dragonBones from "dragonBones";
import { loadScript } from "@/api";
import { Charactor } from "./Charactor";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import RoomView from "../views/Room.vue";
import DirPanel from "./DirPanel.vue";
import { users } from "@/api/mock/data";

let player: Charactor | null = null;
let ctx: CanvasRenderingContext2D | null;
@Component({ name: "Stage", components: { DirPanel } })
export default class Stage extends Vue {
  storage: any;
  charactorsPicked: any[] = [];
  @Prop({ default: false }) isPlayer!: boolean;
  @Prop({}) config!: any;
  refreshId?: number;
  get height() {
    const aw = document.body.clientWidth;
    const ah = document.documentElement?.clientHeight || 600;
    return (
      Math.round(
        Math.min(this.isPlayer ? (aw * 9) / 16 : (aw * 3) / 4, (ah * 2) / 3)
      ) + "px"
    );
  }
  get canvasPixelWidth() {
    return this.isPlayer ? 800 : 600;
  }
  myCharactorName = "暂无";
  hasPlayer = false;
  animations: string[] = [];
  app?: Application;
  walking = false;
  charactors: any[] = [];
  busy = false;
  handleMove(dir: any) {
    let val;
    switch (dir) {
      case "up":
        val = { y: -100 };
        break;
      case "down":
        val = { y: 100 };
        break;
      case "left":
        val = { x: -100 };
        break;
      case "right":
        val = { x: 100 };
        break;
      case "middle":
        this.flip({ dir: 0 });
        return;
      default:
        return;
    }
    this.moveTo(val);
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
    // this.storage.remove("charactors");
    // this.updateData('charators',[],{})
    // setTimeout(() => {
    //   this.syncData("charactors").then((v) => console.log(v));
    // }, 2000);
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
    const c = await Charactor.create({
      ...el,
      uid: UserModule.uid,
      report: 1,
    });
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
  public async initStage() {
    let view = document.querySelector("canvas#mainCanvas") as HTMLCanvasElement;
    if (!this.isPlayer) {
      ctx = view.getContext("2d")!;
      view = document.createElement("canvas");
    }
    const app = new Application({
      view,
      width: 800,
      height: 450,
    });
    if (!this.isPlayer) {
      this.updateFrame(app.view);
    } else {
      Charactor.reporter = this.updateData.bind(this);
      const t = new Graphics();
      t.beginFill(0xbfbfbf);

      // set the line style to have a width of 5 and set the color to red
      t.lineStyle(2, 0xff0000);

      // draw a rectangle
      t.drawRect(0, 0, 200, 450);
      app.stage.addChild(t);
      console.log("----------draw box--------------");
    }
    loadScript().then((doc) => {
      this.charactors = doc.charactors;
    });
    this.storage = new rtc.Storage();
    Charactor.app = app;
    this.setupStageScene();
    this.recoverStage();
    // console.log(this.$refs.stage)
  }
  setupStageScene() {
    const app = Charactor.app;
    console.log(`this.config---`);
    console.log(this.config);
    app.loader.add(this.config.stageImages).load(() => {
      const texture = PIXI.Texture.from(this.config.stageImages);
      var sprite = new PIXI.Sprite(texture);
      console.log(app.loader.resources[this.config.stageImages].texture);
      //添加到舞台
      sprite.width = 600;
      sprite.height = 450;
      sprite.x =  200;
      app.stage.addChild(sprite);
      // app.render()
      //渲染到渲染器
    });
  }
  updateFrame(src: HTMLCanvasElement) {
    if (!ctx) return;
    ctx.drawImage(src, 200, 0, 600, 450, 0, 0, 600, 450);
    this.refreshId = requestAnimationFrame(this.updateFrame.bind(this, src));
  }
  async recoverStage() {
    const charactors = await this.syncData<any[]>("charactors", []);
    this.charactorsPicked = deepCopy(charactors);
    console.log("start recover -----------");
    console.log(charactors);
    for (const el of charactors) {
      const conf = await this.syncData(`char:${el.uid}`, {});
      if (this.isPlayer) {
        if (el.uid === UserModule.uid) {
          const c = await Charactor.create({
            ...el.config,
            ...conf,
            report: 1,
          });
          console.log("recover player -----------");
          console.log(c);
          if (c) {
            player = c;
            this.hasPlayer = true;
            this.myCharactorName = el.config.name;
            this.animations = Array.from(player.animationNames);
          }
        }
      } else {
        Charactor.create({ ...el.config, ...conf });
      }
    }
  }
  get chars() {
    return this.charactors.map((el) => {
      el.picked = this.charactorsPicked.some(
        (e) => e.config.id === el.id && e.uid !== UserModule.uid
      );
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
      e?.replace({ ...el.config, report: 1 });
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
      if (!player) {
        return;
      }
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
  updateMeta() {}
  async moveTo({
    x = undefined as number | undefined,
    y = undefined as number | undefined,
    stop = false,
    time = 2,
    uid = "",
  }) {
    console.log(`moveTo ${x} ${y} ${stop} `);
    if (!stop) {
      if (!player) return;
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
      player.moveTo({ x, y, time });
      return;
    }
    const char = Charactor.list.find((el) => el.config.uid === uid);
    console.log(char);
    char?.moveTo({ x, y, time });
  }
  reset() {
    console.log("destory");
    // const n = this.charactorsPicked.filter((e) => e.uid !== UserModule.uid);
    // this.updateData("charactors", n, {
    //   name: "Char",
    //   content: "0",
    // });
    Charactor.list.forEach((el) => el.destory());
    Charactor.list = [];
    Charactor.app.destroy();
    Charactor.app = null as any;
    ctx = null;
    if (this.refreshId) cancelAnimationFrame(this.refreshId);
  }
}
</script>

<style lang="scss" scoped>
#mainCanvas {
  width: 100%;
  background-color: black;
}
section.controller {
  .ani-picker {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-left: 1rem;
  }
}
</style>
