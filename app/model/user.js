module.exports = (app) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const UserSchema = new Schema({
    avatar: { type: String },
    username: { type: String, required: true },
    password: { type: String, select: false, required: true },
    privileges: {
      type: Number,
      /**
       * 0 超级管理员(可以访问后台)
       * 1 普通用户(可以使用机器人聊天)
       * 2 普通用户(禁止使用机器人聊天)
       * 3 禁止登陆用户
       */
      enum: [0, 1, 2, 3],
      default: 1,
    },
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now },
  });

  return mongoose.model('User', UserSchema);
};
