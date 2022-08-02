import { Controller } from 'egg';

export default class UserController extends Controller {
  // 用户注册
  public async register() {
    const { ctx } = this;
    // 验证参数是否正确
    ctx.validate(
      {
        username: { type: 'username' },
        password: { type: 'password' },
      },
      ctx.request.body,
    );
    const user = await ctx.service.user.findByUsername(
      ctx.request.body.username,
    );

    // 验证用户是否存在
    if (user) {
      ctx.throw(422, '用户已存在，请更换用户名重试！');
    }

    // 生成token

    // 响应
    const body = await ctx.service.user.create(ctx.request.body);
    ctx.body = this.ctx.helper.handleResponseBody(body, '注册成功！', [
      'username',
      'avatar',
      'create_time',
      'update_time',
    ]);
  }

  // 用户登录
  public async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (!username) {
      ctx.throw(422, '请输入用户名！');
    } else if (!password) {
      ctx.throw(422, '请正确输入密码！');
    }
    const user = await ctx.service.user.findByUsername(username, true);

    // 验证用户是否存在
    if (!user) {
      ctx.throw(422, '用户不存在！');
    }

    // 验证密码是否正确
    if (ctx.helper.md5(password) !== user.password) {
      ctx.throw(422, '密码错误！');
    }

    // 生成token

    // 响应
    const body = await ctx.service.user.create(ctx.request.body);
    ctx.body = this.ctx.helper.handleResponseBody(body, '登陆成功！', [
      'username',
      'avatar',
      'create_time',
      'update_time',
    ]);
  }
}
