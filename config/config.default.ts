import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = 'XVCJ9.eyJkYXRhIjpbeyJ0b29sdHQiOiJodHR0MywiZXhwIjoxNjYwNjY1NTk5LCJhdWQiOiIiLCJpc3MiOiIxMjI';

  config.middleware = ['handleError'];

  // 连接mongodb
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/wechat',
      options: {},
    },
  };

  console.log(typeof appInfo);

  config.security = {
    csrf: {
      enable: true,
      // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      headerName: 'x-csrf-token',
      // Cookie 中的字段名，默认为 csrfToken
      cookieName: 'csrfToken',
      // Session 中的字段名，默认为 csrfToken
      sessionName: 'csrfToken',
      ignore: ['/register', '/login'],
    },
    // 跨域白名单
    domainWhiteList: [],
  };
  // // 允许跨域的方法
  // config.cors = {
  //   origin: '*',
  //   allowMethods: 'GET, PUT, POST, DELETE, PATCH'
  // };

  return {
    ...config,
  };
};
