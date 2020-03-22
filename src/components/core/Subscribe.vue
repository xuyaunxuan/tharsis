<template>
  <el-drawer :visible="show" :show-close="false" @close="clickEventClose()">
    <span slot="title">感谢您的投稿！</span>
    <div class="subscribe">
      <el-form>
        <el-form-item label="标题">
          <el-input v-model="subscribeParamater.title"></el-input>
        </el-form-item>
        <el-form-item label="Tags">
          <el-input v-model="subscribeParamater.tag"></el-input>
        </el-form-item>
        <el-form-item label="仅自己可见">
          <el-switch
            v-model="subscribeParamater.isPrivate"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-row style="text-align: right;">
            <el-button type="primary" @click="clickEventSubscribe()" size="medium" round>投稿</el-button>
            <el-button @click="clickEventResetSubscribe()" size="medium" round>重置</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SubscribeParamater from "@/types/article/SubscribeParamater.ts";
import * as _ from "lodash";
@Component
export default class Subscribe extends Vue {
  // 投稿页面开关
  @Prop({ default: false })
  show: boolean = false;
  @Prop()
  articlePath!: string
  // 投稿文本
  @Prop()
  articleValue!: string;
  // 投稿markdown文本
  @Prop()
  articleRenderValue!: string;
  @Prop()
  title!: string;
  @Prop()
  tag!: string;
  @Prop()
  isPrivate!: boolean;
  // 投稿请求接口
  subscribeParamater: SubscribeParamater = new SubscribeParamater();
  @Watch("show")
  onDisplay() {
    console.log(this.articlePath)
    console.log(this.articleValue)
    if (this.show && !_.isEmpty(this.articlePath)) {
      this.subscribeParamater.articlePath = JSON.parse(JSON.stringify(this.articlePath))
      this.subscribeParamater.title = JSON.parse(JSON.stringify(this.title));
      this.subscribeParamater.tag = JSON.parse(JSON.stringify(this.tag));
      if (this.isPrivate) {
        this.subscribeParamater.isPrivate = true;
      }
    }
  }

  /**
   * 投稿
   */
  clickEventSubscribe() {
    // 验证有错，返回
    if (this.validateSbuscribe()) return;
    this.subscribeParamater.articleOri = JSON.parse(JSON.stringify(this.articleValue));
    this.subscribeParamater.article = JSON.parse(JSON.stringify(this.articleRenderValue));
    if (_.isEmpty(this.articlePath)) {
      // 投稿
      this.$axios
        .post("/b/subscribe", this.subscribeParamater)
        .then(response => {
          var result = response.data;
          if (result.result == "OK") {
            this.$message.success("保存成功!");
            this.$emit("saved");
          }
        })
        .catch(error => {
          var result = error.response.data;
          // error数据存在
          if (result && result.errorDto && result.errorDto.errors.length > 0) {
            this.$message.error(result.errorDto.errors[0]);
          }
        });
    } else {
      this.subscribeParamater.articlePath = JSON.parse(JSON.stringify(this.articlePath));
      // 编辑投稿
      this.$axios
        .post("/b/editArticles", this.subscribeParamater)
        .then(response => {
          var result = response.data;
          if (result.result == "OK") {
            this.$message.success("保存成功!");
            this.$emit("saved");
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



  }
  /**
   * 输入数据重置
   */
  clickEventResetSubscribe() {
    this.subscribeParamater = new SubscribeParamater();
  }
  /**
   * 投稿页面关闭
   */
  clickEventClose() {
    this.$emit("close");
  }

  /**
   * 投稿数据验证
   */
  validateSbuscribe(): boolean {
    if (_.isEmpty(this.subscribeParamater.title)) {
      this.$message.error("请输入标题");
      return true;
    }

    return false;
  }
}
</script>
<style scoped>
.subscribe {
  padding: 20px;
}
</style>