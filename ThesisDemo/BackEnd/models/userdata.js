const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  policies: [String],
  favorites: [String],
  flights: [String],
  labeled: [String]
})
const UserModel = mongoose.model('newUser', userSchema);

module.exports = UserModel;
