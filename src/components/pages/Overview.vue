<template>
  <div>
    <div v-for="(article,index) in articles" v-bind:key="index">
      <summary-panel
        :title="article.title"
        :articlePath="article.articlePath"
        :author="article.accountId"
        :postTime="article.postTime"
        :tag="article.tag"
      ></summary-panel>
    </div>
    <span v-if="isNoMore">没有更多文章了</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SummaryPanel from "@/components/core/SummaryPanel.vue";
import ArticleGetParamater from "@/types/article/ArticleGetParamater";
// eslint-disable-next-line no-unused-vars
import ArticleGetResult from "@/types/article/ArticleGetResult";
// eslint-disable-next-line no-unused-vars
import ArticleDto from "@/types/article/ArticleDto";
@Component({
  components: {
    SummaryPanel
  }
})
export default class Overview extends Vue {
  articleGetParamater = new ArticleGetParamater();
  articles: ArticleDto[] = [];
  isNoMore: boolean = false;
  isFirstLoad: boolean = true;

  beforeMount() {
    this.getArticles();
  }

  getArticles() {
    this.articleGetParamater.offset = this.articles.length;
    this.articleGetParamater.limit = 15;
    // 发送注册请求
    this.$axios
      .post("/b/showArticles", this.articleGetParamater)
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
        var result = error.response.data;
        // error数据存在
        if (result && result.errorDto && result.errorDto.errors.length > 0) {
          this.$message.error(result.errorDto.errors[0]);
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
}
</script>
<style>
</style>
