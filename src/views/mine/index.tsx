import { defineComponent } from 'vue';

export default defineComponent({
  name: 'mine',
  props: { msg: String },
  setup(props) {
    return () => <div>我的</div>;
  }
});
