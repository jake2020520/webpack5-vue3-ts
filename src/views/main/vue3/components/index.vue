<template>
  <div>vue3 使用技巧 笔记</div>
  <div>加载文件</div>
  <div>姓名: {{name}}</div>
  <div class="age" @click="add">年龄: {{age}}</div>
  <div>
    <div v-for="(item) in list" v-bind:key="item.id">
      <span>{{item.id}}: {{item.imgUrl}}</span>
    </div>
    <div v-for="(item) in getList" v-bind:key="item.id">
      <span>{{item.id}}: {{item.imgUrl}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent,reactive,toRefs } from "vue";
import { useStore } from'vuex'
import useCount from "@/hooks/useCount";
export default defineComponent({
    setup() {
      const store = useStore();
      const { count, multiple, increase, decrease } = useCount(10);
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
          add,
           count,
            multiple,
            increase,
            decrease,
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