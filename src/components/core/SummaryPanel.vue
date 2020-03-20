<template>
  <div class="summary">
    <el-row>
      <div class="summary-title">
        <a :href="'#/' + articlePath">{{title}}</a>
      </div>
    </el-row>
    <el-row justify="space-between">
      <el-col :span="6">
<div class="summary-author">
        <span>{{author + ' - ' + convertedTime}}</span>
      </div>
      </el-col>
      <el-col :span="6">
      <div class="summary-popular">
        <span>点击量</span>
      </div>  
      </el-col>
      
      
    </el-row>
    <!-- <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
   
          <td width="20"></td>
          <td width="auto" valign="middle">
            <span class="item_title">
              <a
                target="_blank"
              >chrome 扩展 uBlock Adblock Plus 此扩展程序包含恶意软件</a>
            </span>
            <div class="sep5"></div>
            <span class="topic_info">
              <strong>
                <a href="/member/vazo">vazo</a>
              </strong> &nbsp;•&nbsp; 194 天前 &nbsp;•&nbsp; 最后回复来自
              <strong>
                <a href="/member/vazo">vazo</a>
              </strong>
            </span>
          </td>
          <td width="70" align="right" valign="middle">
            <a href="/t/598770#reply6" class="count_livid">6</a>
          </td>
        </tr>
    </table>-->
    <!-- <el-divider  ></el-divider> -->
    <!-- <span>{{title}}</span>
      <li></li>
      <span>{{summary}}</span>
    <li></li>-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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
  // 距离发布经过时间
  convertedTime: string = "";

  beforeMount() {
    // 计算距离发布经过时间
    this.getPastedTime();
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
    var mins = Math.floor(offset / oneMin);
    vals.push(mins);
    vals.push(offset - mins * oneMin);
    return vals;
  }
  appendTime(year: number, day: number, hour: number, min: number) {
    if (year && year > 0) {
      this.convertedTime = year.toString() + " 年前";
      return 
    }
    if (day && day > 0) {
      this.convertedTime = this.convertedTime + day.toString() + " 天";
    }
    if (hour && hour > 0) {
      this.convertedTime = this.convertedTime + hour.toString() + " 小时";
    }
    if (min && min > 0) {
      this.convertedTime = this.convertedTime + min.toString() + " 分钟";
    }
    if (this.convertedTime.length > 0) {
      this.convertedTime = this.convertedTime + "前"
    }
  }
}
</script>
<style>
.summary {
  border-bottom: 1px solid rgba(26, 26, 26, 0.1);
}
.summary:hover {
  box-shadow: 0 2px 6px rgba(26, 26, 26, 0.1);
}
.summary-title {
  padding: 20px;
  font-size: 20px;
  /* text-align: left; */
}
.summary-author {
  padding: 20px;
}
.summary-popular {
  padding: 20px;

}
a {
  text-decoration: none;
}
a:visited {
  color: #000000;
  text-decoration: none;
}
</style>