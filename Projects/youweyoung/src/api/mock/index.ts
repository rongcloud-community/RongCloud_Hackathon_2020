import { users, script1, rooms } from "./data";
import { appid } from "@/config"
import { deepCopy } from '@/utils';

export async function userLogon(data: { id: string; pwd: string }) {
  const user = users.find(
    (el) => el.uid === data.id && el.password === data.pwd
  );
  if (user) {
    return {
      data: {
        uid: user.uid,
        token: "user.token",
        role: user.role,
        nickname: user.nickname,
      },
    };
  }
  return {
    error: {
      msg: "用户名或者密码不准确",
      code: 404,
    },
  };
}

export async function getRTCData(uid: string) {
  const user = users.find((el) => el.uid === uid);
  if (user)
    return {
      appid,
      token: user.token,
    };
  return {
    error: {
      msg: "用户名不准确",
    },
  };
}

export function getCharactors() {
  return fetch("/mock/charactor/list.json").then((res) => res.json());
}

export async function loadScript() {
  return script1
}

export async function loadRoomList(start: number, end: number) {
  return rooms.map(el => ({
    roomId: el.roomId,
    desc: el.desc,
    password: el.password,
    name: el.name,
    bg: `url(${el.bg})`
  }))
}

export async function loadRoomInfo(roomId: string) {
  return deepCopy(rooms.find(el => el.roomId === roomId))
}