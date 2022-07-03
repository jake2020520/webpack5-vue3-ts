import { defineComponent, PropType, reactive, ref, computed, watchEffect, h } from 'vue';
import { useRouter } from 'vue-router';
interface Config {
  name: string;
}
export default defineComponent({
  name: 'App-tsx',
  setup(props, { slots, attrs, emit }) {
    const state = reactive({ name: 'jake---' });
    const aa: Config = { name: 'xusu' };
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
    return () => {
      return (
        <div class="content">
          <el-button onclick={login}>login</el-button>
        </div>
      );
    };
  },
  mounted() {
    console.log('--mounted-');
  }
});
