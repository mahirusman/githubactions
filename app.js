const express = require("express");
// require("./db");
const PostRoutes = require("./router");
const app = express();

app.use(express.json());

app.use(PostRoutes);

console.log(process.env.ENV_VAR);

app.listen(3000, () => {
  console.log(`server is started at ${3000}`);
});
