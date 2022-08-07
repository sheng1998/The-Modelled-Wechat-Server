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
    let message = '';
    if (!value) {
      message = '请输入用户名！';
    } else if (typeof value !== 'string') {
      message = '用户名必需为字符串！';
    } else if (/\s+/.test(value)) {
      message = '用户名禁止携带空格！';
    } else if (value.length < 2 || value.length > 15) {
      message = '用户名长度限制在2-15字符之间！';
    } else if (/[\\/]+/.test(value)) {
      message = '用户名禁止携带斜杠！';
    }
    if (message) return message;
  });

  // 校验密码
  // eslint-disable-next-line consistent-return
  app.validator.addRule('password', (rule, value) => {
    let message = '';
    if (!value) {
      message = '请输入密码！';
    } else if (typeof value !== 'string') {
      message = '密码必需为字符串！';
    } else if (/\s+/.test(value)) {
      message = '密码禁止携带空格！';
    } else if (/[‘’“”，。、；：？！【】《》（）\u4e00-\u9fa0]/.test(value)) {
      message = '密码禁止含有中文或中文字符！';
    } else if (value.length < 8 || value.length > 30) {
      message = '密码长度限制在8-30字符之间！';
    } else if (/[\\/]/.test(value)) {
      message = '密码禁止携带斜杠！';
    } else if (!(/([a-z].?\d)|(\d.?[a-z])/i.test(value))) {
      message = '密码必需含有字母和数字！';
    }
    if (message) return message;
  });
};
