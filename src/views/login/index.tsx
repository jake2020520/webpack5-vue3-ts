import { defineComponent, ref, computed, watchEffect, watch, onMounted } from 'vue';
// import { useRouter } from "vue-router";
import axios from 'axios';

import useURLLoader from '../../hooks/useURLLoader';

interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface TodoProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default defineComponent({
  name: 'App-tsx',
  props: { msg: String },
  setup() {
    const node = ref<null | HTMLElement>(null);
    // const route = useRouter();
    // const login = () => {
    //   console.log('-home-');
    //   // route.replace('./main');
    // };
    let count = ref(1);
    const double = computed(() => {
      return count.value + 2;
    });

    const addCount = () => {
      count.value++;
    };
    const todoData = useURLLoader<TodoProps>('https://jsonplaceholder.typicode.com/todos/1');
    const postData = useURLLoader<PostProps>('https://jsonplaceholder.typicode.com/posts/1');
    // watch 用到的才会监听，并且可以销毁
    /*
     * 自动收集依赖并且触发
     * 自动销毁effect const stop= watchEffect()  stop()
     * 使副作用失效 onInvalidate
     * 副作用执行顺序 flush
     */
    watchEffect(
      onInvalidate => {
        const source = axios.CancelToken.source();
        axios
          .get(`https://jsonplaceholder.typicode.com/todos/${count.value}`, {
            cancelToken: source.token
          })
          .catch(err => {
            console.log('--catch-', err);
          });

        onInvalidate(() => {
          // 连续变化的最后一次执行，有点像防抖
          source.cancel('trigger');
        });
      }
      // { flush: 'post' } // 可以改不是 render 前执行，还是render后执行 post
    );

    onMounted(() => {
      console.log('-login-onMounted--');
    });

    /*
     * 第一个是响应式对象，不是的话，可以用  const {msg}= toRefs(props)
     * 或者用函数 （）=> props.msg
     * 监听多个用户数组 [()=>props.msg,count]
     *
     */
    watch(count, (newValue, oldValue) => {
      console.log('-login-watch--', newValue, oldValue);
    });

    return () => {
      return (
        <div class="content">
          <el-button onclick={addCount}>{count.value}</el-button>
          <div ref={node}>{double.value}_1</div>
          {todoData.result ? <div>{todoData.result.title}</div> : <div>todo-loading...</div>}
          {postData.result ? <div>{postData.result.title}</div> : <div>post-loading...</div>}
        </div>
      );
    };
  },
  mounted() {
    console.log('-login-mounted-');
  }
});
