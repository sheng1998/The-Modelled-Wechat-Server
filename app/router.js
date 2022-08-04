module.exports = (app) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  // 注册
  router.post('/register', controller.user.register);
  // 登录
  router.post('/login', controller.user.login);
};
