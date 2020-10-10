import Vue, { VNode } from "vue";
import PIXI from "pixi.js";
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  namespace global {
    export const RongIMLib: any;
    export const PIXI: PIXI;
  }
}

declare let dragonBones: any;
