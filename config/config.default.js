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

  config.crypto = {
    /**
     * 公钥私钥生成方法：https://juejin.cn/post/6971447144423096351
     * 也可查看notes目录下的截图
     * 需要注意的是被加密字符串长度有限制
     */
    publicKey: '-----BEGIN PUBLIC KEY-----\n'
      + 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDN4PbNvbScu1F0ZO63fbKWg7P5\n'
      + 'mjE9LhfQdG4He8t2P5LIocGgsYk9z+Q94++C+b86KrYirRMEq0vANgS3nCHH7M9R\n'
      + 'dZHQ0e7Kyvp/eEKos7/thf4nTm52lg3ERT/tecyIPTrR1BJ0BEyd8i3i4WR/Ep7S\n'
      + 'RknuZknUHCP1EjIqsQIDAQAB\n'
      + '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n'
      + 'MIICWwIBAAKBgQDN4PbNvbScu1F0ZO63fbKWg7P5mjE9LhfQdG4He8t2P5LIocGg\n'
      + 'sYk9z+Q94++C+b86KrYirRMEq0vANgS3nCHH7M9RdZHQ0e7Kyvp/eEKos7/thf4n\n'
      + 'Tm52lg3ERT/tecyIPTrR1BJ0BEyd8i3i4WR/Ep7SRknuZknUHCP1EjIqsQIDAQAB\n'
      + 'AoGAGti1FksgnDeI/aaTwnWvrhTqiSfkN9gk3tfv6SXpeDf+Cg+d0jiUbu0HFFL+\n'
      + 'zpOGri0XpxnumvNDY4MnxlGjzdRLv2zT/Qy2Ig6+nok5bUzit4W3PCT73X5FBw2p\n'
      + 'zcjnd5+w4CIhfMkrLK4fpXE1l9brq0Qg3oIvRevuKuG9oAECQQDyONlPlMRn3AYU\n'
      + 'bTuksCKZi1IX1PmI537HAvAieU5cUkhq+Ho1RTpLQZ2e2Q4hP2x+zS1MFHp5gN2z\n'
      + 'hieTMRuxAkEA2Zblpgk2z3eit5wk+himJTqGsCkA1OyQGUGq5XYOxKbeAwMFgxL+\n'
      + 'kilwzLOQPyARiyWDrEKskboKn19Z3ti/AQJAKppzJnstHHNnologHnRYcZc+pjBw\n'
      + 'f3LwKoLKx9V8QeK7GA2COTJm8WumFJVq1dA4/giKihIkBJD07amP9mSx0QJAeuIx\n'
      + 'h/ekML8L8k4IxAWvr07CSjKd+aIwL1NaxIRMCtuCfojyT/gmNT2aKsEuMbhWsBLb\n'
      + 'rilpdFNxNFiRVL1sAQJALlVwrXuc06YJoeflN/xpCaV70i6JJ43xGE8Yv1Mp6c3W\n'
      + 'VOLMPOaGQKIn4+Q23nL3xuryfXzQCaT7WTa9CptPcA==\n'
      + '-----END RSA PRIVATE KEY-----',
  };

  return {
    ...config,
  };
};
