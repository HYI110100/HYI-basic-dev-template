import router from './index';
// 路由守卫
router.beforeEach((_1, _2, next) => {
  next();
});
router.afterEach(() => {});
