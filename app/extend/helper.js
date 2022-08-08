const crypto = require('crypto');
const lodash = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = {
  lodash,
  md5(str) {
    return crypto
      .createHash('md5')
      .update(`${str}X5MvjI1jiSUIH1s46s-FkrHgvlj_uGWs1waomf9I`)
      .digest('hex');
  },
  // 处理响应体格式
  // eslint-disable-next-line default-param-last
  handleResponseBody(body, message = '', keys) {
    return {
      code: 0,
      data: keys ? lodash.pick(body, keys) : body,
      message: message || 'Success!',
    };
  },
  // 创建token
  createToken(data) {
    const { secret, expiresIn } = this.app.config.jwt;
    return jwt.sign(data, secret, { expiresIn });
  },
  // token解码
  verifyToken(data) {
    const { secret } = this.app.config.jwt;
    return jwt.verify(data, secret);
  },
  // 设置cookie
  setCookie(name, value) {
    this.ctx.cookies.set(name, value, {
      // 设置cookie的有效期
      maxAge: 1000 * 3600 * 24 * 2,
      // 只允许服务端访问cookie
      httpOnly: true,
      // 对cookie进行签名，防止用户修改cookie
      signed: true,
      // 是否对cookie进行加密
      encrypt: false,
    });
  },
};
