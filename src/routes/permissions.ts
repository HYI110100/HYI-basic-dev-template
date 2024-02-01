import router from './index';
// 路由守卫
router.beforeEach((to, from, next) => {
  next();
});
router.afterEach((to) => {});
