import { defineComponent, PropType, reactive, ref, computed, watchEffect, h } from 'vue';
interface Config {
  name: string;
}
export default defineComponent({
  name: 'App-tsx',
  setup(props, { slots, attrs, emit }) {
    const state = reactive({ name: 'jake' });
    const aa = { name: 'xusu' };
    return () => {
      return (
        <div class="content">
          <router-link to="/login">{state.name}</router-link>
          <router-view></router-view>
        </div>
      );
    };
  },
  mounted() {
    console.log('--mounted-');
  }
});
