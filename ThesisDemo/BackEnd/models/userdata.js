const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  countries: [String],
  favorites: [String],
  travels: [String]
})
const UserModel = mongoose.model('newUser', userSchema);

module.exports = UserModel;
