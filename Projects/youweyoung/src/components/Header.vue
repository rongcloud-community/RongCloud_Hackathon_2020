<template>
  <header id="app-header">
    <div class="header">
      <div class="exp" @click="handleCommand('home')">
        <img class="logo" src="../assets/logo.jpg" alt="" />
        <em style="margin-left: 1rem">在线剧院，给你好看</em>
      </div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :src="avatar"></el-avatar>
        </span>
        <el-dropdown-menu v-if="hasLogon" slot="dropdown" trigger>
          <el-dropdown-item disable>角色：{{ roleName }}</el-dropdown-item>
          <el-dropdown-item>账号：{{ uid }}</el-dropdown-item>
          <el-dropdown-item>昵称：{{ nickName }}</el-dropdown-item>
          <el-dropdown-item divided command="logout"
            >登出(刷新就行了要什么退出)</el-dropdown-item
          >
        </el-dropdown-menu>

        <el-dropdown-menu v-else slot="dropdown">
          <el-dropdown-item command="logon">你还是先登录吧</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script lang="ts">
import { UserModule } from "@/store/user";
// @ is an alias to /src
import { rtc, sleep, Channel, deepCopy } from "@/utils";
import * as dragonBones from "dragonBones";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({ name: "Header" })
export default class Header extends Vue {
  get hasLogon() {
    return UserModule.hasLogon;
  }
  get uid() {
    return UserModule.uid;
  }
  get avatar() {
    return UserModule.avatarPath;
  }
  get nickName() {
    return UserModule.nickname;
  }
  get roleName() {
    return UserModule.role === 1 ? "观众" : "演员";
  }
  private handleCommand(e: string) {
    switch (e) {
      case "home":
        if (this.$route.fullPath !== "/") this.$router.push("/");
        break;
      case "logon":
        if (this.$route.fullPath !== "/logon") this.$router.push("/logon");
        break;
      case "logout":
        UserModule.logout();
        if (this.$route.fullPath !== "/") this.$router.push("/");
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
header#app-header {
  width: 100%;
  background-color: white;
  box-shadow: 0 0.25rem 2px rgb(206, 196, 196);
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: center;
  margin-bottom: 0.25rem;
  display: flex;
  .el-dropdown-link .el-avatar {
    height: 2rem;
    width: 2rem;
    position: relative;
    top: 4px;
  }
  div.header {
    max-width: 60rem;
    .exp {
      display: flex;
      align-items: flex-end;
      cursor: pointer;
    }
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
    img.logo {
      height: 2rem;
    }
  }
}
</style>