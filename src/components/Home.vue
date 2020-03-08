<template>
  <div >
    <my-header />
    <div class="home">
      <h1>申し訳ございません。只今工事中です。</h1>
      <a class="main-nav-logo" href="/">
        <img alt="logo"  src="@/assets/maintenance.gif" width="20%" />
      </a>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import  Header  from "@/components/core/Header.vue";
@Component({
  components: {
    'my-header': Header
  },
})
export default class Home extends Vue {
  @Prop() private msg!: string;
}
</script>
<style >
.home {
  /** header宽度 */
  width: 1000px;
  /** header居中 */
  margin: 0 auto;
  /** 项目居中 */
  align-items: center;
}
</style>
