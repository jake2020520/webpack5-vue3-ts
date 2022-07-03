<template>
  <el-container
    class="layout-container-demo"
    style="height: 500px; border: 1px solid #eee"
  >
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']" :router=true>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main">vue3 技巧</el-menu-item>
              <el-menu-item index="/vue2">vue2</el-menu-item>
              <el-menu-item index="/interview">interview</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
        <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
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
.layout-container-demo {
  .el-header {
    position: relative;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
  }
  .el-aside {
    width: 240px;
    color: var(--el-text-color-primary);
    background: #fff !important;
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
  }
  .el-menu {
    border-right: none;
  }
  .el-main {
    padding: 0;
  }
  .toolbar {
    position: absolute;
    display: inline-flex;
    align-items: center;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
}
</style>