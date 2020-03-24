<template>
  <div class="b-header">
    <div class="b-header-content">
      <a class="main-nav-logo" href="/">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </a>
      <div class="b-header-menu">
        <el-menu
          :default-active="$route.path"
          background-color="#313131"
          text-color="#919191"
          active-text-color="#919191"
          :router="true"
          mode="horizontal"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item v-if="showUserNavi" index="/mypage">我的文章</el-menu-item>
          <el-menu-item v-if="showUserNavi" index="/subscribe">投稿</el-menu-item>
        </el-menu>
      </div>

      <div class="b-header-user">
        <el-button
          v-if="!showUserNavi"
          type="primary"
          size="mini"
          round
          @click="clickEventShowLoginDialog"
        >登录</el-button>
        <span v-else>{{userNickName}}</span>
      </div>
    </div>
    <login :show="showLoginDialog" @close="showLoginDialog = false" @permision="loginSuccess()"></login>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Login from "@/components/pages/login/Login.vue";

@Component({
  components: {
    Login
  }
})
export default class Header extends Vue {
  // 显示个人投稿
  showUserNavi: boolean = false;
  // 登录页面表示控制(true: 打开;false:关闭)
  showLoginDialog: boolean = false;
  // 用户昵称
  userNickName: string = "";

  beforeMount() {
    // session有token,显示个人投稿。
    if (sessionStorage.getItem("token") != null) {
      this.showUserNavi = true;
      this.userNickName = sessionStorage.getItem("nickName") as string;
    }
  }

  /**
   * 登录页面打开事件
   */
  clickEventShowLoginDialog() {
    // 登录页面打开
    this.showLoginDialog = true;
  }

  /**
   * 登录成功
   */
  loginSuccess() {
    // 登录页面关闭
    this.showLoginDialog = false;
    // 显示个人投稿
    this.showUserNavi = true;
    // 显示用户名
    this.userNickName = sessionStorage.getItem("nickName") as string;
  }
}
</script>