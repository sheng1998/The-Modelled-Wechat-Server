module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    avatar: { type: String, default: '' },
    username: { type: String, required: true  },
    password: { type: String, select: false, required: true  },
    create_time: { type: Date, default: Date.now  },
    update_time: { type: Date, default: Date.now  },
  });

  return mongoose.model('User', UserSchema);
};