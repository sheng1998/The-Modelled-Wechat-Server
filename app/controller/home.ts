import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const User = this.app.model.User;
    await new User({
      username: 'lsp',
      password: '123',
    }).save();
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
