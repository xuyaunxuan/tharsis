<template>
  <div>
    <div v-for="(n,index) in test" v-bind:key="index">
      <summary-panel :title="n.t" :summary="n.s" :articlePath="n.u" :author="n.c" :postTime="n.d"></summary-panel>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SummaryPanel from "@/components/core/SummaryPanel.vue";

@Component({
  components: {
    SummaryPanel
  }
})
export default class Overview extends Vue {
  test: any = [
    {
      t: "申し訳ございません。",
      s: "只今工事中です。",
      u: "subscribe",
      c: "test用户",
      d: new Date("2018/3/20 00:10:10")
    },
    {
      t: "申し訳ございません。",
      s: "只今工事中です。",
      u: "subscribe",
      c: "test用户",
      d: new Date("2020/3/19 10:10:10")
    },
    {
      t: "申し訳ございません。",
      s: "只今工事中です。",
      u: "subscribe",
      c: "test用户",
      d: new Date("2020/3/19 10:10:10")
    },
    {
      t: "申し訳ございません。",
      s: "只今工事中です。",
      u: "subscribe",
      c: "test用户",
      d: new Date("2020/3/19 10:10:10")
    },
    {
      t: "申し訳ございません。",
      s: "只今工事中です。",
      u: "subscribe",
      c: "test用户",
      d: new Date("2020/3/19 10:10:10")
    },
    {
      t: "申し訳ございません。",
      s: "只今工事中です。",
      u: "subscribe",
      c: "test用户",
      d: new Date("2020/3/19 10:10:10")
    },
    {
      t: "申し訳ございません。",
      s: "只今工事中です。",
      u: "subscribe",
      c: "test用户",
      d: new Date("2020/3/19 10:10:10")
    },
    {
      t: "申し訳ございません。",
      s: "只今工事中です。",
      u: "subscribe",
      c: "test用户",
      d: new Date("2020/3/19 10:10:10")
    }
  ];
}
</script>
<style>
</style>
