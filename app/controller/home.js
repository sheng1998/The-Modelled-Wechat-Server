const { Controller } = require('egg');

module.exports = class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello egg!';
  }
};
