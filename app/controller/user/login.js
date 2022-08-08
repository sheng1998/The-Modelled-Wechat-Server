const { Controller } = require('egg');

// 用户登录
class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (!username) {
      ctx.throw(422, { code: 1, message: '请输入用户名！' });
    } else if (!password) {
      ctx.throw(422, { code: 2, message: '请正确输入密码！' });
    }
    const user = await ctx.service.user.findByUsername(username, true);

    // 验证用户是否存在
    if (!user) {
      ctx.throw(422, { code: 1, message: '用户不存在！' });
    }

    // 验证密码是否正确
    if (ctx.helper.md5(password) !== user.password) {
      ctx.throw(422, { code: 2, message: '密码错误！' });
    }

    // 生成token并设置cookie
    // eslint-disable-next-line no-underscore-dangle
    const token = ctx.helper.createToken({ userId: user._id });
    ctx.helper.setCookie('session_id', token);

    // 响应数据
    ctx.body = ctx.helper.handleResponseBody(user, '登陆成功！', [
      'username',
      'avatar',
    ]);
  }
}

module.exports = LoginController;
