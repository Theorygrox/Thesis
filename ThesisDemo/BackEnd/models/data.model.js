const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  region: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  newCases: {
    type: Number,
    required: true,
  },
  death: {
    type: Number,
    required: true,
  },
});

const Data = mongoose.model("Data", userSchema);

module.exports = Data;
