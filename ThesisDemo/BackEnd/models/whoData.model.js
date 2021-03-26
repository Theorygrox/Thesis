const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const whoSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    "WHO Region": String,
  },
  { collection: "whoData" }
);

const whoData = mongoose.model("whoData", whoSchema);

module.exports = whoData;
