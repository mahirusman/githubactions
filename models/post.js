const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("posts", postSchema);
