import { defineComponent, reactive } from 'vue';

interface Config {
  name: string;
}

export default defineComponent({
  name: 'App-tsx',
  setup() {
    const state = reactive({ name: 'jake_1' });
    const data: Config = { name: 'aa' };
    return () => {
      return (
        <div class="content">
          <div>{data.name}</div>
          <router-link to="/login">{state.name}</router-link>
          <router-view></router-view>
        </div>
      );
    };
  }
});
