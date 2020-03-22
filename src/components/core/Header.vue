<template>
  <div class="b-header">
    <div class="b-header-content">
      <a class="main-nav-logo" href="/">
        <img alt="logo" height="32" src="@/assets/logo.svg" />
      </a>
      <div class="b-header-menu">
        <el-menu default-active="/" :router="true" mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/creater">我的文章</el-menu-item>
          <el-menu-item index="/subscribe">投稿</el-menu-item>
        </el-menu>
      </div>

      <div class="b-header-user">
        <div v-show="nickName == null">
          <el-button type="primary" size="mini" round @click="clickEventShowLoginDialog">登录</el-button>
        </div>
        <div v-show="nickName != null">
          <span>{{nickName}}</span>
        </div>
        <el-button icon="el-icon-edit" size="mini" @click="$router.push({name: 'subscribe'})">投稿</el-button>
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
  // 登录页面表示控制(true: 打开;false:关闭)
  showLoginDialog: boolean = false;
  get nickName() {
    return sessionStorage.getItem("nickName") as string;
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
  }
}
</script>
<style scoped>
.b-header {
  width: 100%;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.b-header-content {
  /** 项目对齐一行 */
  display: flex;
  /** header宽度 */
  width: 1100px;
  /** header高度 */
  height: 60px;
  /** header居中 */
  margin: 0 auto;
  /** 项目居中 */
  align-items: center;
}
.b-header-menu {
  margin-left: 25px;
}
.b-header-user {
  flex: 1;
  display: -webkit-box;
  justify-content: flex-end;
  align-items: center;
}
</style>