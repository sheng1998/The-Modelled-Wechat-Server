const { Controller } = require('egg');

// 用户注册
class UserController extends Controller {
  async index() {
    const { ctx } = this;
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

    // 生成token

    // 响应
    const body = await ctx.service.user.create(ctx.request.body);
    ctx.body = ctx.helper.handleResponseBody(body, '注册成功！', [
      'username',
      'avatar',
      'create_time',
      'update_time',
    ]);
  }
}

module.exports = UserController;
