const RongRTC = (window as any).RongRTC;
const RongIMLib = (window as any).RongIMLib;

export let rtc = null as any;

export function initRTC() {
  rtc = new RongRTC({
    RongIMLib: RongIMLib,
    debug: true,
  });
}
