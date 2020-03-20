<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
  background-color: #e2e2e2;
}
</style>
