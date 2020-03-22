<template>
  <el-form>
    <el-row class="article-title">
      <span>{{articleDto.title}}</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="article-author">
      <el-col :span="6">
        <span>{{articleDto.accountId}}</span>
      </el-col>
      <el-col :span="6" style="text-align:right;">
        <span>{{postTime}}</span>
      </el-col>
    </el-row>
    <div class="article-content" v-html="articleDto.content" v-highlight>{{articleDto.content}}</div>
    <div class="modify-time">
      <span>编辑于  {{updateTime}}</span>
    </div>
  </el-form>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import ArticleDto from "@/types/article/ArticleDto.ts";
// eslint-disable-next-line no-unused-vars
import ArticleGetResult from "@/types/article/ArticleGetResult";

@Component
export default class ArticleDetail extends Vue {
  content: string = "";
  // 文章信息
  articleDto: ArticleDto = new ArticleDto();
  postTime: string = "";
  updateTime: string = "";
  beforeMount() {
    this.$axios
      .get("/b/articleDetail", {
        params: { post: this.$route.params.post_id }
      })
      .then(response => {
        var result = response.data as ArticleGetResult;
        if (result.result == "OK") {
          this.articleDto = result.articles[0];
          this.postTime =this.formatTime(new Date(result.articles[0].postTime))
          this.updateTime = this.formatTime(new Date(result.articles[0].updateTime))
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

  // 转换显示日期
  formatTime(postTime : Date) :string{
    var now = new Date()
    // 判断是否今年
    if (postTime.getFullYear() == now.getFullYear()) {
      return (postTime.getMonth() + 1) + "月" + postTime.getDate() + "日"
    } else {
      return postTime.getFullYear() + "年" + (postTime.getMonth() + 1) + "月" + postTime.getDate() + "日"
    }
  }
}
</script>
<style scoped>
.article-title {
  padding: 22px;
  font-size: 30px;
  font-weight: 500;
}
.article-author {
  padding: 0px 30px 30px 30px;
  font-size: 15px;
}
.article-content {
  padding: 30px 22px 0px 22px;
}

</style>
