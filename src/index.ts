import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import debounce from 'lodash/debounce';
import 'element-plus/dist/index.css';
import './common.css';
import './main.less';

// const getNum = async (num1: number, num2: number) => {
//   await setTimeout(() => {
//     console.log('getNum:timeout: ', num1 + num2)
//   }, 1000)
//   console.log('getNum: ', num1 + num2)
// }

// const data = [{ aa: 'aa' }, { bb: 'bb' }, { cc: 'cc' }];
// console.log(data);
// const getNama = new Promise(resolve => {
//   setTimeout(() => {
//     resolve({ name: 'I come from ch1ina1 1' });
//   }, 2000);
// });

// getNama.then(data => {
//   console.log('getName:111 ', data);
// });

// createApp(App).use(store).use(router).use(ElementPlus).mount('#app');
createApp(App).use(store).use(ElementPlus).mount('#app');

// const aa = 'aa';
// console.log(aa);

// getNum(1, 2)
