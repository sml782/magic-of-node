'use strict';

module.exports = app => {
  const { mongoose } = app;
  const UserScheme = mongoose.Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    avatar: { type: String, require: true, default: '' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now() },
  });
  return mongoose.model('User', UserScheme);
};
