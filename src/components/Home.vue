<template>
  <div >
    <my-header />
    <div class="home">
      <router-view></router-view>
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
  width: 1200px;
  /** header居中 */
  margin: 0 auto;
  /** 项目居中 */
  align-items: center;
}
</style>
