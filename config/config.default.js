module.exports = (appInfo) => {
  const config = {};

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
      // 忽略csrf校验的接口
      ignore: ['/api/v1/register', '/api/v1/login'],
    },
    // 跨域白名单
    domainWhiteList: [],
  };

  return {
    ...config,
  };
};
