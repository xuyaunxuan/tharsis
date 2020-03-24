<template>
  <div>
    <div v-for="(article,index) in articles" v-bind:key="index">
      <summary-panel
        :title="article.title"
        :articlePath="article.articlePath"
        :author="article.accountId"
        :postTime="article.postTime"
        :tag="article.tag"
        :fromUserHome="true"
        :isPrivate="article.isPrivate"
        @delete="handleDeleted()"
      ></summary-panel>
    </div>
    <span v-if="isNoMore">没有更多文章了...</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import SummaryPanel from "@/components/core/SummaryPanel.vue";
import ArticleGetParamater from "@/types/article/ArticleGetParamater";
// eslint-disable-next-line no-unused-vars
import ArticleGetResult from "@/types/article/ArticleGetResult";
// eslint-disable-next-line no-unused-vars
import ArticleDto from "@/types/article/ArticleDto";
// eslint-disable-next-line no-unused-vars
import BaseResult from "@/types/common/BaseResult";
@Component({
  components: {
    SummaryPanel
  }
})
export default class PersonalHome extends Vue {
  articleGetParamater = new ArticleGetParamater();
  articles: ArticleDto[] = [];
  isNoMore: boolean = false;
  isFirstLoad: boolean = true;
  @Inject("reload") doReload: any;
  beforeMount() {
    this.getArticles();
  }

  handleDeleted() {
    this.showSuccess("删除成功!");
    this.doReload();
  }

  /**
   * 获取所有文章
   */
  getArticles() {
    this.articleGetParamater.offset = this.articles.length;
    this.articleGetParamater.limit = 15;
    // 发送注册请求
    this.$axios
      .post("v1/b/u/all/post", this.articleGetParamater)
      .then(response => {
        var result = response.data as ArticleGetResult;
        if (result.result == "OK" && result.articles != null) {
          result.articles.forEach(item => {
            item.postTime = new Date(item.postTime);
            this.articles.push(item);
          });

          if (this.isFirstLoad) {
            // 监听滚动事件
            window.addEventListener("scroll", this.scrollBottom);
            this.isFirstLoad = false;
          }
        } else {
          this.isNoMore = true;
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

  scrollBottom() {
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
    var windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
    var scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
    if (scrollTop + windowHeight == scrollHeight && !this.isNoMore) {
      this.getArticles();
    }
  }
  /**
   * 显示成功提示
   */
  showSuccess(msg: string) {
    this.$notify({
      title: msg,
      message: "",
      type: "success"
    });
  }
  /**
   * 显示错误提示
   */
  showMessage(msg: string) {
    this.$notify({
      title: msg,
      message: "",
      type: "error"
    });
  }
}
</script>
<style>
</style>
