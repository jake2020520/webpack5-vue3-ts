<template>
  <div>about</div>
    <el-button>I am ElButton</el-button>
      <el-button type="primary">Primary</el-button>
        <el-calendar v-model="value" />
</template>
<script lang="ts">
import { defineComponent,ref } from "vue";
export default defineComponent({
    setup() {
       const value = ref(new Date())
         return {
      value,
    }
    }
});
</script>