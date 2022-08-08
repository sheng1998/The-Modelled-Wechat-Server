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
      // 关闭csrf校验
      enable: false,
      // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      headerName: 'x-csrf-token',
      // Cookie 中的字段名，默认为 csrfToken
      cookieName: 'csrfToken',
      // Session 中的字段名，默认为 csrfToken
      sessionName: 'csrfToken',
      // 忽略csrf校验的接口
      ignore: ['/api/v1/register', '/api/v1/login'],
      // 跨域白名单
      // domainWhiteList: ['http://localhost:*'],
    },
  };

  config.cors = {
    origin: (ctx) => {
      const { origin } = ctx.request.header;
      const whiteList = ['http://119.91.74.150', 'https://sheng1998.github.io/'];
      for (let i = 0; i < whiteList.length; i += 1) {
        if (origin.startsWith(whiteList[i])) {
          return origin;
        }
      }
    },
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    // cookie跨域配置
    credentials: true,
  };

  config.jwt = {
    secret: '6IkpXVCJ9.eyJkYXRhIjpbeyJ0b29sdHQiOiJodHRwczovL3Rvb2x0dC5jb20ifV0sImlhdCI6MTY1OTk2NTU0MCwiZX',
    expiresIn: '2d',
  };

  return {
    ...config,
  };
};
