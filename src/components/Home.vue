<template>
  <div>
    <my-header />
    <div class="home">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue,Provide } from "vue-property-decorator";
import Header from "@/components/core/Header.vue";
@Component({
  components: {
    "my-header": Header
  }
})
export default class Home extends Vue {
  isRouterAlive: boolean = true;
  @Provide('reload')
  reload() {
    this.isRouterAlive = false;
    this.$nextTick(function() {
      this.isRouterAlive = true;
    });
  }
}
</script>
<style >
.home {
  background: #313131;
  /** header宽度 */
  width: 1100px;
  /** header居中 */
  margin: 0 auto;
  margin-top: 2px;
  /** 项目居中 */
  align-items: center;
}
</style>
