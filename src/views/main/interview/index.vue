<template>
  <div>vue 基础面试 笔记</div>
  <div>加载文件</div>

</template>
<script lang="ts">
import { defineComponent,reactive,toRefs } from "vue";
import { useStore } from'vuex'
export default defineComponent({
    setup() {
      const store = useStore();
      const data = reactive({
          name: "trisaaat",
          age: 22,
          sex: "boy",
          list:[],
          getList:[],
        })
        const add = async()=>{
            await store.dispatch('common/getWeather')
           data.list =store.state.common.weatherData
           console.log('store.getters ',store.getters)
           data.getList =store.getters['common/getterWeatherData']
        }
        return {
          ...toRefs(data),
          add
        }
    },

    
});
</script>
<style lang="less" scoped>
.age{
  cursor: pointer;
  color: red;
}

</style>