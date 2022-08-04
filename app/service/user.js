const { Service } = require('egg');

module.exports = class UserService extends Service {
  async create(data) {
    const user = new this.app.model.User({
      ...data,
      password: this.ctx.helper.md5(data.password),
      privileges: 1,
    });
    // 保存到数据库
    await user.save();
    return user;
  }

  async findByUsername(username, password = false) {
    if (password) {
      return this.app.model.User.findOne({ username }).select('+password');
    }
    return this.app.model.User.findOne({ username });
  }

  // async getUserInfo(data) {
  //   return this.app.model.User.findOne({ data });
  // }
};
