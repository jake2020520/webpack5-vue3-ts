import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index')
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
