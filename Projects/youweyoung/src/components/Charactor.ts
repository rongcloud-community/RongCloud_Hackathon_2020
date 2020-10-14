import { Application } from "pixi.js";
import { PixiArmatureDisplay, PixiFactory, EventObject } from "dragonBones";
import { dragonBones, sleep } from "@/utils";

export interface ICharactorConfig {
  flipX: boolean;
  flipY: boolean;
  key: string;
  name: string;
  x?: number;
  y?: number;
  report?: boolean
  rotation?: number;
  angle?: number;
  scale?: [number, number];
  id: string;
  uid: string;
}

export class Charactor {
  static reporter?: (name: string, data: any) => void;
  static list: Charactor[] = [];
  speed: [number, number, number] = [0, 0, 0];
  destination?: [number, number, number]
  _onReady?: (el: Charactor) => void;
  config: ICharactorConfig;
  report = false;
  static refreshId: number;
  static update() {
    this.list.forEach((charactor) => {
      const [sx, sy, sr] = charactor.speed;
      if (sx != 0) charactor.x += sx;
      if (sy != 0) charactor.y += sy;
      if (sr != 0) charactor.el.angle += sr;
      if (charactor.destination) {
        const [time, tx, ty] = charactor.destination
        if (tx !== charactor.x) {
          const d = tx - charactor.x
          const dx = d < 0 ? Math.max(tx, charactor.x - 1 * time) : Math.min(tx, charactor.x + 1 * time)
          if (dx < 0) {
            charactor.x = 900
            charactor.destination[1] = 900 + dx
          } else if (dx > 900) {
            charactor.x = 0
            charactor.destination[1] = dx - 900
          } else {
            charactor.x = dx
          }
        }
        if (ty !== charactor.y) {
          const d = ty - charactor.y
          const dy = d < 0 ? Math.max(ty, charactor.y - 1 * time) : Math.min(ty, charactor.y + 1 * time)
          charactor.y = dy
        }
        if (tx === charactor.x && ty === charactor.y) {
          charactor.destination = undefined
          charactor.play({
            name: charactor.animationNames[0]
          })
        }
        charactor.reportState()
      }
    });
    this.refreshId = requestAnimationFrame(this.update.bind(this));
  }
  static app: Application;
  static async create(config: ICharactorConfig) {
    if (!this.app) {
      return null
    }
    const el = await this.parseData(config.key)
    if (this.list.length === 0) {
      this.update()
    }
    return el ? new Charactor(el, config) : null
  }
  static async parseData(key: string) {
    try {
      const res = ["ske.json", "tex.json", "tex.png"].map(
        (el) => `/static/resources/bones/${key}/${key}_${el}`
      );
      const loader = this.app.loader;
      await new Promise(resolve => {
        const { resources } = loader;
        const loads = res.filter(key => !resources[key])
        if (loads.length > 0)
          return loader.add(loads).load(() => {
            resolve()
          })
        resolve()
      })
      const factory = PixiFactory.factory,
        { resources } = this.app.loader;
      const [rawData, texture, bone] = [resources[res[1]].data, resources[res[2]].texture, resources[res[0]].data]
      factory.parseTextureAtlasData(
        rawData,
        texture
      );
      factory.parseDragonBonesData(bone);
      return factory.buildArmatureDisplay(
        key
      ) as PixiArmatureDisplay
    } catch (error) {

    }
  }
  public el!: PixiArmatureDisplay;

  constructor(
    el: PixiArmatureDisplay,
    config: ICharactorConfig
  ) {
    this.el = el
    this.config = config
    this.syncState()
  }
  syncState() {
    const config = this.config
    if (config.report) {
      this.report = true
      delete this.config.report
    }
    const el = this.el
    const x = config.x || Charactor.app.screen.width / 2;
    const y = config.y || Charactor.app.screen.height / 2;
    const scale = config.scale || [1, 1];
    el.x = x;
    el.y = y;
    el.scale.set(...scale);
    el.anchor.set(0.5, 0.5);
    el.armature.flipY = config.flipY
    el.armature.flipX = config.flipX
    Charactor.list.push(this);
    Charactor.app.stage.addChild(el)
    el.animation.play(el.animation.animationNames[0])
    el.addDBEventListener(dragonBones.EventObject.COMPLETE as any, e => {
      if (el.animation.lastAnimationName !== this.animationNames[0])
        el.animation.play(this.animationNames[0])
    }, el)
    console.log(`--------------create charactor -------------`)
    console.log(el)
  }
  get x() {
    return this.el.x;
  }
  set x(v) {
    if (this.el) {
      this.el.x = v;
    }
  }
  destory(isReplace = false) {
    const i = Charactor.list.findIndex(e => e === this)
    Charactor.list.splice(i, 1)
    Charactor.app.stage.removeChild(this.el)
    this.el?.destroy()
    if (!isReplace) {
      if (Charactor.list.length === 0) {
        console.log('cancel refresh________________')
        cancelAnimationFrame(Charactor.refreshId)
      }
    }
    console.log('remove')
  }
  async replace(config: ICharactorConfig) {
    if (config.id === this.config.id) {
      return this
    }
    this.destory(true)
    const el = await Charactor.parseData(config.key)
    if (el) {
      this.el = el
      this.config = config
      this.syncState()
      console.log('replaced!!!!')
      return true
    }
    return false
  }
  get y() {
    return this.el.y;
  }
  set y(v) {
    if (this.el) {
      this.el.y = v;
    }
  }
  get animationNames() {
    return this.el?.animation.animationNames;
  }
  power({ x = 0, y = 0, rotate = 0 }) {
    this.speed = [
      x || this.speed[0],
      y || this.speed[1],
      rotate || this.speed[2],
    ];
  }
  moveTo(e: { x?: number, y?: number, time?: number }) {
    const x = typeof e.x === "number" ? e.x : this.x
    const y = typeof e.y === "number" ? e.y : this.y
    if (x === this.x && y === this.y) return
    const time = e.time || 1
    console.log(`move to ${x} ${y} ${time}`)
    let name = this.animationNames.find(el => el.indexOf('走') > -1)
    if (time > 1) {
      let nn = this.animationNames.find(el => el.indexOf('跑') > -1 || el.indexOf('飞') > -1)
      if (nn) name = nn
    }
    if (name) {
      this.play({
        name,
        time: 0
      })
    }
    this.destination = [time, x, y]
  }
  reportState() {
    if (Charactor.reporter && this.report)
      Charactor.reporter(`char:${this.config.uid}`, this.metadata)
  }
  get metadata() {
    return {
      x: this.x,
      y: this.y,
      speed: this.speed,
      width: this.el.width,
      height: this.el.height,
      scale: [this.el.scale.x, this.el.scale.y],
      flipX: !!this.el.armature.flipX,
      flipY: !!this.el.armature.flipY,
      config: this.config
    }
  }
  flip({ dir = 0 }) {
    let [sx, sy, sr] = this.speed;
    console.log(`char flip ${dir}`)
    if (dir == 1) {
      this.el.armature.flipY = !this.el.armature.flipY;
      sy = -sy;
    } else {
      this.el.armature.flipX = !this.el.armature.flipX;
      sx = -sx;
    }
    this.speed = [sx, sy, sr];
  }
  play({ name = '', time = -1 }) {
    if (this.el && this.animationNames.includes(name)) {
      this.el.animation.play(name, time);
      return
    }
  }
  ready(func: any) {
    this._onReady = func;
  }
}
