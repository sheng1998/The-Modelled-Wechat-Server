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
    // ? 暂时不知道为什么不能使用下面语法
    // {...user}
    if (user && !user.avatar) {
      user.avatar = '';
    }
    return user;
  }

  async findById(id, password = false) {
    let user = null;
    if (password) {
      user = await this.app.model.User.findById(id).select('+password');
    } else {
      user = await this.app.model.User.findById(id);
    }
    if (user && !user.avatar) {
      user.avatar = '';
    }
    return user;
  }

  async findByUsername(username, password = false) {
    let user = null;
    if (password) {
      user = await this.app.model.User.findOne({ username }).select('+password');
    } else {
      user = await this.app.model.User.findOne({ username });
    }
    if (user && !user.avatar) {
      user.avatar = '';
    }
    return user;
  }
};
