import type { RouteRecordRaw } from 'vue-router';
import Home from '@/pages/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/errorPage/404.vue'),
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/pages/errorPage/401.vue'),
  },
];

export default routes;
