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

      <el-form-item>
        <el-input v-model="loginParamater.accountId" placeholder="你的ID/邮箱"></el-input>
      </el-form-item>
      <el-form-item >
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
    <el-form v-if="loginMode == '2'" :model="registerParamater">
      <div class="b-logo">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </div>
      <div class="b-alert">
        <div v-for="value in registerErrorMessage" v-bind:key="value">
          <el-alert :title="value" type="error"></el-alert>
        </div>
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
          <el-button type="primary" @click="clickEventRegister()" size="medium" round>注册</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <el-form v-if="loginMode == '3'" :model="resetParamater" >
      <div class="b-logo">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </div>
      <div class="b-alert">
        <div v-for="value in resetErrorMessage" v-bind:key="value">
          <el-alert :title="value" type="error"></el-alert>
        </div>
      </div>
      <el-form-item>
        <el-input v-model="resetParamater.mailAddress" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="resetParamater.captchaCode" placeholder="请输入邮件验证码">
          <el-button v-show="!showCount" @click="clickEventSendCaptchaMail"  slot="append"  >发送验证码</el-button>
          <span v-show="showCount" slot="append" >{{timerCount}} s</span>
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
// eslint-disable-next-line no-unused-vars
// import { ElForm } from "element-ui/types/form";
import LoginParamater from "@/types/login/LoginParamater";
import RegisterParamater from "@/types/login/RegisterParamater";
import ResetParamater from "@/types/login/ResetParamater"
// eslint-disable-next-line no-unused-vars
import BaseResult from '@/types/common/BaseResult'
// eslint-disable-next-line no-unused-vars
import LoginResult from '@/types/login/LoginResult'
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
  // 注册错误信息
  registerErrorMessage: string[] = [];
  // 重置密码错误信息
  resetErrorMessage: string[] = [];
  // 验证码倒计时显示(true：显示)
  showCount : boolean = false;
  // 倒计时
  timer : any = null
  timerCount : number = 60

  clearMessage() {
    this.loginErrorMessage = [];
    this.registerErrorMessage = [];
    this.resetErrorMessage = []
  }
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

  /**
   * 注册
   */
  async clickEventRegister() {
    // 清空注册错误信息
    this.clearMessage()
    // 验证有错，返回
    if (this.validateRegister()) return;

    // 发送注册请求
    this.$axios.post('/user/register', this.registerParamater)
      .then(response=> {
        var result = response.data as BaseResult
        if (result.result == "OK") {
          this.$message.success("注册成功!");
          // 跳转至登录
          this.loginMode = '1';
        }
      })  
      .catch(error=>{
        var result = error.response.data as BaseResult
        // error数据存在
        if (result && result.errorDto && result.errorDto.errors.length > 0) {
          result.errorDto.errors.forEach(msg => {
            this.registerErrorMessage.push(msg)
          })
        }
      });
  }

  /**
   * 发送验证邮件
   */
  clickEventSendCaptchaMail() {
    if (!this.timer) {
      if (this.validateSendMail()) return;
      this.showCount = true;
      this.timerCount = 60
      this.timer = setInterval(() => {
        if (this.timerCount > 0 && this.timerCount <= 60) {
          this.timerCount--;
        } else {
          this.showCount = false;
          clearInterval(this.timer);  // 清除定时器
          this.timer = null;
        }
      }, 1000)
      // 发送验证邮件
      this.$axios.post('/user/sendCaptchaMail', {mailAddress: this.resetParamater.mailAddress})
    }  
  }

  /**
   * 重置密码
   */
  clickEventResetPassword() {
    // 清空注册错误信息
    this.clearMessage()
    // 验证有错，返回
    if (this.validateReset()) return;

    // 发送注册请求
    this.$axios.post('/user/resetPassword', this.resetParamater)
      .then(response=> {
        var result = response.data as BaseResult
        if (result.result == "OK") {
          this.$message.success("重置成功!");
          // 跳转至登录
          this.loginMode = '1';
        }
      })  
      .catch(error=>{
        var result = error.response.data as BaseResult
        // error数据存在
        if (result && result.errorDto && result.errorDto.errors.length > 0) {
          result.errorDto.errors.forEach(msg => {
            this.resetErrorMessage.push(msg)
          })
        }
      }); 
  }

  /**
   * 登录
   */
  async clickEventLogin() {
    //  清空错误信息
    this.clearMessage()
    // 验证有错，返回
    if (this.validateLogin()) return;
    // 判断是否是邮箱
    var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    var param = new LoginParamater()
    param.password = this.loginParamater.password
    if (regEmail.test(this.loginParamater.accountId)) {
      param.mailAddress = this.loginParamater.accountId
    } else {
      param.accountId = this.loginParamater.accountId
    }
    this.$axios.post('/user/login', param)
      .then(response=> {
        var result = response.data as LoginResult
        if (result.result == "OK") {
          this.$message.success("登录成功!");
          sessionStorage.setItem('token', result.token)
          sessionStorage.setItem('accountId', result.accountId)
          sessionStorage.setItem('mailAddress', result.mailAddress)
          sessionStorage.setItem('nickName', result.nickName)
          this.$emit("permision");
        }
      })  
      .catch(error=>{
        var result = error.response.data as LoginResult
        // error数据存在
        if (result && result.errorDto && result.errorDto.errors.length > 0) {
          result.errorDto.errors.forEach(msg => {
            this.loginErrorMessage.push(msg)
          })
        }
      });
  }

  /**
   * 验证注册参数(true:有错误)
   */
  validateRegister() :boolean{
    if (_.isEmpty(this.registerParamater.accountId)) {
      this.$message.error("请输入ID");
      return true
    }
    if (_.isEmpty(this.registerParamater.mailAddress)) {
      this.$message.error("请输入邮箱地址");
      return true
    }
    if (_.isEmpty(this.registerParamater.nickName)) {
      this.$message.error("请输入用户名");
      return true
    }
    if (_.isEmpty(this.registerParamater.password)) {
      this.$message.error("请输入密码");
      return true
    }
    return false
  }

  /**
   * 验证注册参数(true:有错误)
   */
  validateSendMail() :boolean{
    if (_.isEmpty(this.resetParamater.mailAddress)) {
      this.$message.error("请输入邮箱地址");
      return true
    }

    return false
  }

  /**
   * 验证注册参数(true:有错误)
   */
  validateReset() :boolean{
    if (_.isEmpty(this.resetParamater.mailAddress)) {
      this.$message.error("请输入邮箱地址");
      return true
    }
    if (_.isEmpty(this.resetParamater.captchaCode)) {
      this.$message.error("请输入验证码");
      return true
    }
    if (_.isEmpty(this.resetParamater.oncePassword)) {
      this.$message.error("请输入一次密码");
      return true
    }
    if (_.isEmpty(this.resetParamater.twicePassword)) {
      this.$message.error("请输入二次密码");
      return true
    }

    return false
  }

  /**
   * 验证登录参数(true:有错误)
   */
  validateLogin() :boolean{
    if (_.isEmpty(this.loginParamater.accountId)) {
      this.$message.error("请输入ID/邮箱");
      return true
    }
    if (_.isEmpty(this.loginParamater.password)) {
      this.$message.error("请输入密码");
      return true
    }
    return false
  }

}
</script>
<style >
.b-logo {
  padding: 10px 0px 35px 0px;
}
.b-alert {
  padding: 0px 0px 10px 0px;
}
.el-message {
top: 20px !important;
}
</style>