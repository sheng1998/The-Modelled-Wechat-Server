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
    return UserService.handleUserInfo(user);
  }

  async findById(id, password = false) {
    let user = null;
    if (password) {
      user = await this.app.model.User.findById(id).select('+password');
    } else {
      user = await this.app.model.User.findById(id);
    }
    return UserService.handleUserInfo(user);
  }

  async findByUsername(username, password = false) {
    let user = null;
    if (password) {
      user = await this.app.model.User.findOne({ username }).select('+password');
    } else {
      user = await this.app.model.User.findOne({ username });
    }
    return UserService.handleUserInfo(user);
  }

  // 由于读取到的user不是普通的对象，需要对默认值进行处理
  static handleUserInfo(user) {
    if (user && !user.avatar) {
      // eslint-disable-next-line no-param-reassign
      user.avatar = '';
    }
    return user;
  }
};
