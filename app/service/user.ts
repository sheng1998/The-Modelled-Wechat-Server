import { Service } from 'egg';
import { TUser } from '../../typings/user/index';

export default  class UserService extends Service {
  public async create(data: TUser) {
    data.password = this.ctx.helper.md5(data.password);
    const user = new this.app.model.User(data);
    // 保存到数据库
    await user.save();
    return user;
  }

  public async findByUsername(username: string, password = false) {
    if (password) {
      return this.app.model.User.findOne({ username }).select('+password');
    }
    return this.app.model.User.findOne({ username });
  }

  // public async getUserInfo(data: TUser) {
  //   return this.app.model.User.findOne({ data });
  // }
}
