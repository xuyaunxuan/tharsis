<template>
  <el-dialog :visible="show" width="400px" center @open="initLogin()" @close="clickEventClose()">
    <el-form v-if="loginMode == '1'">
      <div class="b-logo">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </div>
      <div class="b-alert">
        <div v-for="value in loginErrorMessage" v-bind:key="value">
          <el-alert :title="value" type="error"></el-alert>
        </div>
      </div>

      <el-form-item prop="id">
        <el-input v-model="loginParamater.id" placeholder="你的ID/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginParamater.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <a href="javascript:void(0)" @click="initReset()">忘记密码?</a>
      </el-form-item>
      <el-form-item>
        <el-row style="text-align: right;">
          <el-button type="primary" @click="clickEventLogin()" size="medium" round>登录</el-button>
          <el-button @click="initRegister()" size="medium" round>注册</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <el-form v-if="loginMode == '2'" :model="registerParamater" :rules="rules" ref="registerForm">
      <div class="b-logo">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </div>
      <el-form-item prop="id">
        <el-input v-model="registerParamater.mailAddress" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input v-model="registerParamater.nickName" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerParamater.oncePassword" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <a href="javascript:void(0)" @click="initLogin()">直接登录</a>
        <el-row style="text-align: right;">
          <el-button type="primary" @click="initRegister()" size="medium" round>注册</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <el-form v-if="loginMode == '3'" :model="resetParamater" :rules="rules" ref="registerForm">
      <div class="b-logo">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </div>
      <el-form-item prop="id">
        <el-input v-model="resetParamater.mailAddress" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input v-model="resetParamater.identifyCd" placeholder="请输入邮件验证码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="resetParamater.oncePassword" placeholder="请输入新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="resetParamater.twicePassword" placeholder="请再次输入新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <a href="javascript:void(0)" @click="loginMode = '1'">直接登录</a>
        <el-row style="text-align: right;">
          <el-button type="primary" @click="initRegister()" size="medium" round>注册</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
// import { ElForm } from "element-ui/types/form";
import LoginParamater from "@/types/login/LoginParamater";
import RegisterParamater from "@/types/login/RegisterParamater";
import ResetParamater from "@/types/login/ResetParamater"
import * as _ from "lodash";
@Component
export default class Login extends Vue {
  @Prop({ default: false })
  show: boolean = false;
  // 模式(1:登录,2:注册,3:忘记密码)
  loginMode: string = '1';
  // 登录接口
  loginParamater: LoginParamater = new LoginParamater();
  // 注册接口
  registerParamater: RegisterParamater = new RegisterParamater();
  // 重置接口
  resetParamater: ResetParamater = new ResetParamater();
  // 登录错误信息
  loginErrorMessage: string[] = [];

  clearMessage() {
    this.loginErrorMessage = [];
  }
  clearParamater() {
    this.loginParamater = new LoginParamater();
    this.registerParamater = new RegisterParamater();
    this.resetParamater = new ResetParamater();
  }
  /**
   * 登录页面初期化
   */
  initLogin() {
    this.loginMode = '1';
    this.clearMessage();
    this.clearParamater();
  }
  /**
   * 注册页面初期化
   */
  initRegister() {
    this.loginMode = '2';
    this.clearMessage();
    this.clearParamater();
  }
  /**
   * 重置密码页面初期化
   */
  initReset() {
    this.loginMode = '3';
    this.clearMessage();
    this.clearParamater();
  }

  /**
   * 登录页面关闭
   */
  clickEventClose() {
    this.$emit("close");
  }

  async clickEventLogin() {
    this.loginErrorMessage = [];
    this.$nextTick(() => {
      if (_.isEmpty(this.loginParamater.id)) {
        this.loginErrorMessage.push("请输入ID/邮箱");
      }
      if (_.isEmpty(this.loginParamater.password)) {
        this.loginErrorMessage.push("请输入密码");
      }
      // (this.$refs.loginForm as ElForm).clearValidate();

      // // errorflg
      // let hasError: boolean = false;
      // await (this.$refs.loginForm as ElForm).validate(valid => {
      //   hasError = !valid;
      // });

      if (this.loginErrorMessage.length > 0) {
        return;
      }
      this.$axios.post("/login");
    });
  }


}
</script>
<style scoped>
.b-logo {
  padding: 10px 0px 35px 0px;
}
.b-alert {
  padding: 0px 0px 10px 0px;
}
</style>