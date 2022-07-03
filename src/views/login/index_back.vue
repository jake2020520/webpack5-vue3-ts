<template>
  <div class="content">
    <el-button @click="login">login</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const data = reactive({
      name: 'trisaaat',
      age: 22,
      sex: 'boy',
      list: [],
      getList: []
    });
    const route = useRouter();
    const login = () => {
      console.log('-home-');
      route.replace('./main');
    };
    return {
      ...toRefs(data),
      login
    };
  }
});
</script>
<style lang="less" scoped>
.content {
  height: 100%;
}
.age {
  cursor: pointer;
  color: red;
}
</style>
