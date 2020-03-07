<template>
    <div id="center">内容</div>
</template>
<script lang="ts">
import mix from "./ToolBar";
import {Component, Mixins} from 'vue-property-decorator'

@Component
export default class ToolBar extends Mixins(mix) {
}
</script>
<style>
/* @import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css"); */
</style>