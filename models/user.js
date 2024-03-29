const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  address: [String],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
