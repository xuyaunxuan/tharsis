<template>
  <div>
      <a class="main-nav-logo" href="/">
        <img alt="logo"  src="@/assets/maintenance.gif" width="20%" />
      </a>
    <div  v-for="(n,index) in test" v-bind:key="index">
        <summary-panel :title="n.t" :summary="n.s"></summary-panel>
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
export default class PersonalHome extends Vue {
  test: any = [
    {
      t: "申し訳ございません。",
      s: "只今工事中です。"
    },
    {
      t: "申し訳ございません。",
      s: "只今工事中です。"
    },    {
      t: "申し訳ございません。",
      s: "只今工事中です。"
    },    {
      t: "申し訳ございません。",
      s: "只今工事中です。"
    },    {
      t: "申し訳ございません。",
      s: "只今工事中です。"
    },    {
      t: "申し訳ございません。",
      s: "只今工事中です。"
    },    {
      t: "申し訳ございません。",
      s: "只今工事中です。"
    },    {
      t: "申し訳ございません。",
      s: "只今工事中です。"
    },    {
      t: "申し訳ございません。",
      s: "只今工事中です。"
    },
  ];
}
</script>
<style>
</style>
