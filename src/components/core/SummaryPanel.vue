<template>
  <div class="summary">
    <el-row v-if="fromUserHome" type="flex" justify="space-between">
      <el-col class="summary-edit" :span="6">
        <el-tag v-if="isPrivate == '0'">公开</el-tag>
        <el-tag v-else type="info">私有</el-tag>
      </el-col>
      <el-col class="summary-edit" style="text-align: right" :span="6">
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-edit"
          @click="clickEditArticle"
          circle
        ></el-button>
        <el-popconfirm
          title="确定删除吗？"
          cancelButtonType="default"
          confirmButtonType="primary"
          @onConfirm="clickDeleteArticle"
        >
          <el-button size="medium" type="primary" icon="el-icon-delete" slot="reference" circle></el-button>
        </el-popconfirm>
      </el-col>
    </el-row>
    <el-row>
      <div class="summary-title">
        <router-link :to="'/post/' + articlePath">{{title}}</router-link>
      </div>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <div class="summary-author">
          <span>{{author + ' - ' + convertedTime}}</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="summary-popular">
          <el-tag>{{tag}}</el-tag>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import ArticleGetResult from "@/types/article/ArticleGetResult";
// eslint-disable-next-line no-unused-vars
import ArticleDto from "@/types/article/ArticleDto";
// eslint-disable-next-line no-unused-vars
import BaseResult from "@/types/common/BaseResult";
@Component
export default class SummaryPanel extends Vue {
  // 标题
  @Prop()
  title!: string;
  // URL
  @Prop()
  articlePath!: string;
  // 摘要
  @Prop()
  summary!: string;
  // 作者
  @Prop()
  author!: string;
  // 发布时间
  @Prop()
  postTime!: Date;
  @Prop()
  tag!: string;
  // 从用户画面迁移
  @Prop()
  fromUserHome!: boolean;
  @Prop()
  // 0:公开文章1:私有文章
  isPrivate!: string;
  // 距离发布经过时间
  convertedTime: string = "";

  beforeMount() {
    // 计算距离发布经过时间
    this.getPastedTime();
  }

  // 编辑用户文章
  clickEditArticle() {
    this.$axios
      .get("v1/b/detail", {
        params: { post: this.articlePath }
      })
      .then(response => {
        var result = response.data as ArticleGetResult;
        if (result.result == "OK") {
          this.$router.push({
            name: "subscribe",
            params: {
              title: result.articles[0].title,
              articlePath: result.articles[0].articlePath,
              contentOri: result.articles[0].contentOri,
              tag: result.articles[0].tag,
              isPrivate: result.articles[0].isPrivate
            }
          });
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

  /**
   * 文章删除
   */
  clickDeleteArticle() {
    var param = {
      articlePath: this.articlePath
    };
    this.$axios
      .post("v1/b/u/del/post", param)
      .then(response => {
        var result = response.data as ArticleGetResult;
        if (result.result == "OK") {
          this.$emit("delete");
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
   * 计算距离发布经过时间
   */
  getPastedTime() {
    if (this.postTime) {
      var year!: number;
      var day!: number;
      var hour!: number;
      var min!: number;
      // 现在时间
      var now = new Date().getTime();
      // 经过时间（毫秒）
      var offset = now - this.postTime.getTime();
      var years = this.calcYear(offset);
      var days: number[];
      var hours: number[];
      var mins: number[];
      if (years[0] > 0) {
        year = years[0];
        days = this.calcDay(years[1]);
      } else {
        days = this.calcDay(offset);
      }

      if (days[0] > 0) {
        day = days[0];
        hours = this.calcHour(days[1]);
      } else {
        hours = this.calcHour(offset);
      }

      if (hours[0] > 0) {
        hour = hours[0];
        mins = this.calcmin(hours[1]);
      } else {
        mins = this.calcmin(offset);
      }
      min = mins[0];
      this.appendTime(year, day, hour, min);
    }
  }

  calcYear(offset: number): number[] {
    var vals: number[] = [];
    var oneYear = 365 * 24 * 60 * 60 * 1000;
    var years = Math.floor(offset / oneYear);
    vals.push(years);
    vals.push(offset - years * oneYear);
    return vals;
  }
  calcDay(offset: number): number[] {
    var vals: number[] = [];
    var oneDay = 24 * 60 * 60 * 1000;
    var days = Math.floor(offset / oneDay);
    vals.push(days);
    vals.push(offset - days * oneDay);
    return vals;
  }
  calcHour(offset: number): number[] {
    var vals: number[] = [];
    var oneHour = 60 * 60 * 1000;
    var hours = Math.floor(offset / oneHour);
    vals.push(hours);
    vals.push(offset - hours * oneHour);
    return vals;
  }
  calcmin(offset: number): number[] {
    var vals: number[] = [];
    var oneMin = 60 * 1000;
    var mins = Math.ceil(offset / oneMin);
    vals.push(mins);
    vals.push(offset - mins * oneMin);
    return vals;
  }
  appendTime(year: number, day: number, hour: number, min: number) {
    if (year && year > 0) {
      this.convertedTime = year.toString() + " 年前";
      return;
    }
    if (day && day > 0) {
      this.convertedTime = this.convertedTime + day.toString() + " 天前";
      return;
    }
    if (hour && hour > 0) {
      this.convertedTime = this.convertedTime + hour.toString() + " 小时";
    }
    if (min && min > 0) {
      this.convertedTime = this.convertedTime + min.toString() + " 分钟";
    }
    if (this.convertedTime.length > 0) {
      this.convertedTime = this.convertedTime + "前";
    }
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