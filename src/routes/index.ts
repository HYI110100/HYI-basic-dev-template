// import { createRouter, createWebHistory } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import appRoute from './modules/app';
export const asyncRoutes = [{ path: '/:pathMatch(.*)*', name: 'not-found-page', redirect: '/404' }];
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [...appRoute, { path: '/:pathMatch(.*)*', name: 'not-found-page', redirect: '/404' }],
});

export default router;
