<template>
  <div class="home">
    <mavon-editor
      v-model="articleValue"
      :toolbars="markdownOption"
      previewBackground="#313131"
      toolbarsBackground="#313131"
      @save="clickEventSubscribe"
      @change="hasChangeFlg = true"
      codeStyle="monokai-sublime"
    />
    <subscribe
      :show="showSubscribeDialog"
      @close="showSubscribeDialog = false"
      :articleValue="articleValue"
      :articleRenderValue="articleRenderValue"
      :title="title"
      :tag="tag"
      :isPrivate="isPrivate"
      :articlePath="articlePath"
      @saved="subscribeSuccess()"
    ></subscribe>
    <login :show="showLoginDialog" @close="showLoginDialog = false" @permision="loginSuccess()"></login>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/pages/login/Login.vue";
import Subscribe from "@/components/core/Subscribe.vue";
// eslint-disable-next-line no-unused-vars
import ArticleDto from "@/types/article/ArticleDto";
import * as _ from "lodash";

@Component({
  components: {
    Subscribe,
    Login
  }
})
export default class Writing extends Vue {
  // postId
  articlePath: string = "";
  // 文本
  articleValue: string = "";
  // markdowm文本
  articleRenderValue: string = "";
  // 标题
  title: string = "";
  // tag
  tag: string = "";
  // 私有
  isPrivate: boolean = false;
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

  beforeMount() {
    var title = this.$route.params.title;
    if (title != undefined) {
      this.articlePath = this.$route.params.articlePath;
      this.articleValue = this.$route.params.contentOri;
      this.title = title;
      this.tag = this.$route.params.tag;
      this.isPrivate = this.$route.params.isPrivate == "0" ? false : true;
    }
  }

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
    this.articleValue = val;
    this.articleRenderValue = render;
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
    this.$router.push("mypage");
  }
}
</script>
<style>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
