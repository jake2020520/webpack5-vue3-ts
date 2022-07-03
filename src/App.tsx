// import { defineComponent, PropType, reactive, ref, computed, watchEffect, h } from 'vue';
// interface Config {
//   name: string;
// }
// export default defineComponent({
//   name: 'App-tsx',
//   setup(props, { slots, attrs, emit }) {
//     const state = reactive({ name: 'jake---' });
//     return () => {
//       return <div>fafaf</div>;
//     };
//   },
//   mounted() {
//     console.log('--mounted-');
//   }
// });
import { withModifiers, defineComponent } from 'vue';

const App = defineComponent({
  setup() {
    let aa = '徐凌峰';
    return () => (
      <div>
        <div>{aa}</div>
      </div>
    );
  }
});

export default App;
