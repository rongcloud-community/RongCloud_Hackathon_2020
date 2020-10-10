<template>
  <div class="content">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">用户登录</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="loginForm.id"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.pwd"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%;background: #505458;border: none"
          @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { userLogon } from "../../api";
import { mainBus } from "../../utils";
let room: any;
@Component({ name: "logon", components: {} })
export default class Room extends Vue {
  loginForm:any = {};
  async login() {
    const { error, data } = await userLogon(this.loginForm);
    if (error) {
      return this.$notify.error({
        title: "登录失败",
        message: error.msg,
      });
    }
    mainBus.emit("user-logon", data);
    this.$router.replace('/')
  }
}
</script>

<style lang="scss" scoped>
.content {
  align-items: center;
  justify-content: center;
}
#poster {
  // background:url("../assets/eva.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
  padding: 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
