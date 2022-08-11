const { Controller } = require('egg');

// 用户注册
class RegisterController extends Controller {
  async index() {
    const { ctx } = this;
    if (!ctx.request.body.password) {
      ctx.throw(422, { code: 2, message: '请正确输入密码！' });
    }
    const password = ctx.helper.privDecrypt(ctx.request.body.password);
    if (password) {
      ctx.request.body.password = password;
    }
    // if (!password) {
    //   ctx.throw(422, { code: 2, message: '密码请加密传输！' });
    // } else {
    //   ctx.request.body.password = password;
    // }
    // 验证参数是否正确
    try {
      ctx.validate(
        {
          username: { type: 'username' },
          password: { type: 'password' },
        },
        ctx.request.body,
      );
    } catch (error) {
      const { field } = error.errors[0];
      ctx.throw(422, {
        ...error.errors[0],
        code: field === 'password' ? 2 : 1,
      });
    }
    const user = await ctx.service.user.findByUsername(
      ctx.request.body.username,
    );

    // 验证用户是否存在
    if (user) {
      ctx.throw(422, {
        code: 1,
        message: '用户已存在，请更换用户名重试！',
      });
    }

    const newUser = await ctx.service.user.create(ctx.request.body);
    // 生成token并设置cookie
    // eslint-disable-next-line no-underscore-dangle
    const token = ctx.helper.createToken({ userId: newUser._id });
    ctx.helper.setCookie('session_id', token);

    // 响应
    ctx.body = ctx.helper.handleResponseBody(newUser, '注册成功！', [
      'username',
      'avatar',
    ]);
  }
}

module.exports = RegisterController;
