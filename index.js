const express = require("express");
// require("./db");
const PostRoutes = require("./router");
const app = express();

app.use(express.json());

app.use(PostRoutes);

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const PORT = process.env.NODE_ENV == "production" ? 4000 : 3000;

app.listen(PORT, () => {
  console.log(`server is started at ${PORT}`);
});
//
