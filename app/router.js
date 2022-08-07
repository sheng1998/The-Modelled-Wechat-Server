module.exports = (app) => {
  const { controller, router } = app;
  // 配置路由前缀
  router.prefix('/api/v1');

  router.get('/', controller.home.index);
  // 注册
  router.post('/register', controller.user.register);
  // 登录
  router.post('/login', controller.user.login);
};
