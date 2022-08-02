module.exports = (app) => {
  // eslint-disable-next-line consistent-return
  app.validator.addRule('json', (rule, value) => {
    try {
      JSON.parse(value);
    } catch (err) {
      return 'must be json string';
    }
  });

  // 校验用户名
  // eslint-disable-next-line consistent-return
  app.validator.addRule('username', (rule, value) => {
    if (typeof value !== 'string') {
      return '用户名必需为字符串！';
    } if (/\s+/.test(value)) {
      return '用户名禁止携带空格！';
    } if (value.length < 2 || value.length > 15) {
      return '用户名长度限制在2-15字符之间！';
    } if (/[\\/]+/.test(value)) {
      return '用户名禁止携带斜杠！';
    }
  });

  // 校验密码
  // eslint-disable-next-line consistent-return
  app.validator.addRule('password', (rule, value) => {
    if (typeof value !== 'string') {
      return '密码必需为字符串！';
    } if (/\s+/.test(value)) {
      return '密码禁止携带空格！';
    } if (/[`‘“，。、；：？！【】《》（）\u4e00-\u9fa5]+/.test(value)) {
      return '密码禁止含有中文或中文字符！';
    } if (value.length < 8 || value.length > 30) {
      return '密码长度限制在8-30字符之间！';
    } if (/[\\/<>[](){}]/.test(value)) {
      return '密码禁止携带斜杠或括号！';
    } if (!(/[a-zA-Z]+/.test(value) && /\d+/.test(value))) {
      return '密码强度太低，必需含有字母和数字！';
    }
  });
};
