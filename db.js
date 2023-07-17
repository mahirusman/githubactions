const mongoose = require("mongoose");

const MONGODBURL = "mongodb://localhost:27017/practise";

mongoose.connect(MONGODBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => {
  console.log("dataBase connected successfully");
});

db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = db;
