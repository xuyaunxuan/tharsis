<template>
  <el-dialog
    :visible="show"
    :close-on-click-modal="false"
    width="400px"
    center
    @open="initLogin()"
    @close="clickClose()"
  >
    <el-form v-if="loginMode == '1'">
      <div class="login-logo">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </div>
      <el-form-item>
        <el-input v-model="loginParamater.accountId" placeholder="你的ID/邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginParamater.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <a href="javascript:void(0)" @click="initReset()">忘记密码?</a>
      </el-form-item>
      <el-form-item>
        <el-row style="text-align: right;">
          <el-button type="primary" @click="clickLogin()" size="medium" round>登录</el-button>
          <el-button @click="initRegister()" size="medium" round>注册</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <el-form v-if="loginMode == '2'" :model="registerParamater">
      <div class="login-logo">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </div>
      <el-form-item>
        <el-input v-model="registerParamater.accountId" placeholder="ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="registerParamater.mailAddress" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="registerParamater.nickName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="registerParamater.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <a href="javascript:void(0)" @click="initLogin()">直接登录</a>
        <el-row style="text-align: right;">
          <el-button type="primary" @click="clickRegister()" size="medium" round>注册</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <el-form v-if="loginMode == '3'" :model="resetParamater">
      <div class="login-logo">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </div>
      <el-form-item>
        <el-input v-model="resetParamater.mailAddress" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="resetParamater.captchaCode" placeholder="请输入邮件验证码">
          <el-button v-show="!showCount" @click="clickSendCaptchaMail" slot="append">发送验证码</el-button>
          <span v-show="showCount" slot="append">{{timerCount}} s</span>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="resetParamater.oncePassword" placeholder="请输入新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="resetParamater.twicePassword" placeholder="请再次输入新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <a href="javascript:void(0)" @click="loginMode = '1'">直接登录</a>
        <el-row style="text-align: right;">
          <el-button type="primary" @click="clickEventResetPassword()" size="medium" round>重置</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import LoginParamater from "@/types/login/LoginParamater";
import RegisterParamater from "@/types/login/RegisterParamater";
import ResetParamater from "@/types/login/ResetParamater";
// eslint-disable-next-line no-unused-vars
import BaseResult from "@/types/common/BaseResult";
// eslint-disable-next-line no-unused-vars
import LoginResult from "@/types/login/LoginResult";
import * as _ from "lodash";
@Component
export default class Login extends Vue {
  @Prop({ default: false })
  show: boolean = false;
  // 模式(1:登录,2:注册,3:忘记密码)
  loginMode: string = "1";
  // 登录接口
  loginParamater: LoginParamater = new LoginParamater();
  // 注册接口
  registerParamater: RegisterParamater = new RegisterParamater();
  // 重置接口
  resetParamater: ResetParamater = new ResetParamater();
  // 验证码倒计时显示(true：显示)
  showCount: boolean = false;
  // 倒计时
  timer: any = null;
  timerCount: number = 60;

  clearParamater() {
    this.loginParamater = new LoginParamater();
    this.registerParamater = new RegisterParamater();
    this.resetParamater = new ResetParamater();
    this.showCount = false;
  }
  /**
   * 登录页面初期化
   */
  initLogin() {
    this.loginMode = "1";
    this.clearParamater();
  }
  /**
   * 注册页面初期化
   */
  initRegister() {
    this.loginMode = "2";
    this.clearParamater();
  }
  /**
   * 重置密码页面初期化
   */
  initReset() {
    this.loginMode = "3";
    this.clearParamater();
  }

  /**
   * 登录页面关闭
   */
  clickClose() {
    this.timer = null;
    this.$emit("close");
  }

  /**
   * 注册
   */
  async clickRegister() {
    // 验证有错，返回
    if (this.validateRegister()) return;

    // 发送注册请求
    this.$axios
      .post("/v1/u/reg", this.registerParamater)
      .then(response => {
        var result = response.data as BaseResult;
        if (result.result == "OK") {
          this.showSuccess("注册成功!");
          // 跳转至登录
          this.loginMode = "1";
        }
      })
      .catch(error => {
        var result = error.response.data as BaseResult;
        // error数据存在
        if (result && result.errorDto && result.errorDto.errors.length > 0) {
          result.errorDto.errors.forEach(msg => {
            let _this = this;
            setTimeout(function() {
              _this.showMessage(msg);
            }, 100);
          });
        }
      });
  }

  /**
   * 发送验证邮件
   */
  clickSendCaptchaMail() {
    if (!this.timer) {
      if (this.validateSendMail()) return;
      this.showCount = true;
      this.timerCount = 60;
      this.timer = setInterval(() => {
        if (this.timerCount > 0 && this.timerCount <= 60) {
          this.timerCount--;
        } else {
          this.showCount = false;
          clearInterval(this.timer); // 清除定时器
          this.timer = null;
        }
      }, 1000);
      // 发送验证邮件
      this.$axios
        .post("/v1/u/send/mail", {
          mailAddress: this.resetParamater.mailAddress
        })
        .catch(error => {
          var result = error.response.data as BaseResult;
          // error数据存在
          if (result && result.errorDto && result.errorDto.errors.length > 0) {
            result.errorDto.errors.forEach(msg => {
              let _this = this;
              setTimeout(function() {
                _this.showMessage(msg);
              }, 100);
            });
          }
        });
    }
  }

  /**
   * 重置密码
   */
  clickEventResetPassword() {
    // 验证有错，返回
    if (this.validateReset()) return;

    // 发送注册请求
    this.$axios
      .post("/v1/u/reset/password", this.resetParamater)
      .then(response => {
        var result = response.data as BaseResult;
        if (result.result == "OK") {
          this.showSuccess("重置成功!");
          // 跳转至登录
          this.loginMode = "1";
        }
      })
      .catch(error => {
        var result = error.response.data as BaseResult;
        // error数据存在
        if (result && result.errorDto && result.errorDto.errors.length > 0) {
          result.errorDto.errors.forEach(msg => {
            let _this = this;
            setTimeout(function() {
              _this.showMessage(msg);
            }, 100);
          });
        }
      });
  }

  /**
   * 登录
   */
  async clickLogin() {
    // 验证有错，返回
    if (this.validateLogin()) return;
    // 判断是否是邮箱
    var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var param = new LoginParamater();
    param.password = this.loginParamater.password;
    if (regEmail.test(this.loginParamater.accountId)) {
      param.mailAddress = this.loginParamater.accountId;
    } else {
      param.accountId = this.loginParamater.accountId;
    }
    this.$axios
      .post("/v1/u/login", param)
      .then(response => {
        var result = response.data as LoginResult;
        if (result.result == "OK") {
          this.showSuccess("登录成功!");
          // session填入token和用户信息
          sessionStorage.setItem("token", result.token);
          sessionStorage.setItem("accountId", result.accountId);
          sessionStorage.setItem("mailAddress", result.mailAddress);
          sessionStorage.setItem("nickName", result.nickName);
          this.$emit("permision");
        }
      })
      .catch(error => {
        var result = error.response.data as LoginResult;
        // error数据存在
        if (result && result.errorDto && result.errorDto.errors.length > 0) {
          result.errorDto.errors.forEach(msg => {
            let _this = this;
            setTimeout(function() {
              _this.showMessage(msg);
            }, 100);
          });
        }
      });
  }

  /**
   * 验证注册参数(true:有错误)
   */
  validateRegister(): boolean {
    if (_.isEmpty(this.registerParamater.accountId)) {
      this.showMessage("请输入ID");
      return true;
    }
    if (_.isEmpty(this.registerParamater.mailAddress)) {
      this.showMessage("请输入邮箱地址");
      return true;
    }
    if (_.isEmpty(this.registerParamater.nickName)) {
      this.showMessage("请输入用户名");
      return true;
    }
    if (_.isEmpty(this.registerParamater.password)) {
      this.showMessage("请输入密码");
      return true;
    }
    return false;
  }

  /**
   * 验证注册参数(true:有错误)
   */
  validateSendMail(): boolean {
    if (_.isEmpty(this.resetParamater.mailAddress)) {
      this.showMessage("请输入邮箱地址");
      return true;
    }

    return false;
  }

  /**
   * 验证注册参数(true:有错误)
   */
  validateReset(): boolean {
    if (_.isEmpty(this.resetParamater.mailAddress)) {
      this.showMessage("请输入邮箱地址");
      return true;
    }
    if (_.isEmpty(this.resetParamater.captchaCode)) {
      this.showMessage("请输入验证码");
      return true;
    }
    if (_.isEmpty(this.resetParamater.oncePassword)) {
      this.showMessage("请输入一次密码");
      return true;
    }
    if (_.isEmpty(this.resetParamater.twicePassword)) {
      this.showMessage("请输入二次密码");
      return true;
    }

    return false;
  }

  /**
   * 验证登录参数(true:有错误)
   */
  validateLogin(): boolean {
    if (_.isEmpty(this.loginParamater.accountId)) {
      this.showMessage("请输入ID/邮箱");
      return true;
    }
    if (_.isEmpty(this.loginParamater.password)) {
      this.showMessage("请输入密码");
      return true;
    }
    return false;
  }

  showMessage(msg: string) {
    this.$notify({
      title: msg,
      message: "",
      type: "error"
    });
  }
  showSuccess(msg: string) {
    this.$notify({
      title: msg,
      message: "",
      type: "success"
    });
  }
}
</script>
<style>
</style>