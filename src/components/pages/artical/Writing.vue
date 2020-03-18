<template>
  <div class="home">
    <mavon-editor
      v-model="articalValue"
      :toolbars="markdownOption"
      @save="clickEventSubscribe"
      @change="hasChangeFlg = true"
    />
    <subscribe :show="showSubscribeDialog" @close="showSubscribeDialog = false" :articalValue="articalValue" :articalRenderValue="articalRenderValue" @saved="subscribeSuccess()"></subscribe>
    <login :show="showLoginDialog" @close="showLoginDialog = false" @permision="loginSuccess()"></login>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/pages/login/Login.vue";
import Subscribe from "@/components/core/Subscribe.vue";
import * as _ from "lodash";

@Component({
  components: {
    Subscribe,
    Login
  }
})
export default class Writing extends Vue {
  // 文本
  articalValue: string = "";
  // markdowm文本
  articalRenderValue: string = "";
  // 登录页面表示控制(true: 打开;false:关闭)
  showLoginDialog: boolean = false;
  // 变更状态显示(true: 有变更;false: 无变更)
  hasChangeFlg = false;
  // 登录页面表示控制(true: 打开;false:关闭)
  showSubscribeDialog: boolean = false;
  markdownOption: any = {
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    superscript: false, // 上角标
    subscript: false, // 下角标
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    imagelink: true, // 图片链接
    code: true, // code
    table: true, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: false, // 沉浸式阅读
    htmlcode: false, // 展示html源码
    help: false, // 帮助
    undo: false, // 上一步
    redo: false, // 下一步
    trash: false, // 清空
    save: true, // 保存（触发events中的save事件）
    navigation: true, // 导航目录
    alignleft: true, // 左对齐
    aligncenter: true, // 居中
    alignright: false, // 右对齐
    subfield: true, // 单双栏模式
    preview: false // 预览
  };

  /**
   * 登录成功
   */
  loginSuccess() {
    // 登录页面关闭
    this.showLoginDialog = false;
    // 打开投稿页面
    this.showSubscribeDialog = true;
  }

  /**
   * 保存点击事件
   */
  clickEventSubscribe(val: any, render: any) {
    this.articalValue = val;
    this.articalRenderValue = render;
    // 从session拿用户ID
    var accountId = sessionStorage.getItem("accountId") as string;
    // 用户没有登录，打开登录界面
    if (_.isEmpty(accountId)) {
      this.showLoginDialog = true;
    }
    // 用户已经登录，打开投稿页面
    else {
      this.showSubscribeDialog = true;
    }
  }
  /**
   * 文章投稿成功
   */
  subscribeSuccess() {
    this.showSubscribeDialog = false;
  }
}
</script>
<style>
</style>
