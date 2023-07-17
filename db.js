const mongoose = require("mongoose");

const MONGODBURL =
  process.env.NODE_ENV == "local"
    ? "mongodb://localhost:27017/practise"
    : "mongodb+srv://usman786:usman786@cluster0.1ma8wil.mongodb.net/?retryWrites=true&w=majority";

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
