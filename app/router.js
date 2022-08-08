module.exports = (app) => {
  const { controller, router } = app;
  // 配置路由前缀
  router.prefix('/api/v1');

  router.get('/', controller.home.index);
  // 注册
  router.post('/register', controller.user.register.index);
  // 登录
  router.post('/login', controller.user.login.index);
  // 检查登陆状态(是否登陆)
  router.get('/login/check', controller.user.login.check);
};
