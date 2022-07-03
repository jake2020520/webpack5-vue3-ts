<template>
  <div class="content">
    <router-link to="/login"></router-link>
    <!-- <router-link to="/about">about</router-link>
  <router-link to="/mine">mine</router-link> -->
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {}
});
</script>
<style lang="less" scoped>
.content {
  min-height: 700px;
}
</style>
