const { Controller } = require('egg');

// 用户登录
class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    // eslint-disable-next-line no-console, prefer-const
    let { username, password } = ctx.request.body;
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

    // 验证密码是否正确(先解密密码)
    const decryptPassword = ctx.helper.privDecrypt(password);
    if (decryptPassword) {
      password = decryptPassword;
    }
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

  // 检查当前登录状态
  async check() {
    const { ctx } = this;
    const sessionId = ctx.cookies.get('session_id', { signed: false });

    // token不存在
    if (!sessionId) {
      ctx.throw(403, { code: 1, message: '请先登陆！' });
    }

    // 判断 token 是否有效
    let userId = '';
    try {
      userId = ctx.helper.verifyToken(sessionId).userId;
    } catch (error) {
      ctx.throw(403, { code: 1, message: '请先登陆！' });
    }

    // token 解析失败
    if (!userId) {
      ctx.throw(403, { code: 1, message: '请先登陆！' });
    }

    // 校验用户是否存在
    const user = await ctx.service.user.findById(userId);
    if (!user) {
      ctx.throw(403, { code: 1, message: '请先登陆！' });
    }

    // 已经登录重新生成token并设置cookie
    // eslint-disable-next-line no-underscore-dangle
    const token = ctx.helper.createToken({ userId: user._id });
    ctx.helper.setCookie('session_id', token);

    ctx.body = ctx.helper.handleResponseBody(user, '已登录！', [
      'username',
      'avatar',
    ]);
  }
}

module.exports = LoginController;
