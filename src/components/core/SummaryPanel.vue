<template>
<div class="content">    
    <el-card shadow="hover">
        <span>{{title}}</span>
                <li></li>
        <span>{{summary}}</span>
                <li></li>
    </el-card>

  </div>

</template>
<script lang="ts">
import { Component, Prop,   Vue } from "vue-property-decorator";
@Component
export default class SummaryPanel extends Vue {
  // 标题
  @Prop()
  title!: string
  // 摘要
  @Prop()
  summary!: string
}

</script>