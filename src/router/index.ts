import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/index.vue'),
    children: [
      { path: '', component: () => import('../views/main/vue3/index.vue') },
      { path: '/vue2', component: () => import('../views/main/vue2/index.vue') },
      { path: '/interview', component: () => import('../views/main/interview/index.vue') }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/index.vue')
  }
  // {
  //   path: '/mine',
  //   name: 'Mine',
  //   component: () => import('../views/mine/index')
  // }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
