const express = require("express");
// require("./db");
const PostRoutes = require("./router");
const app = express();

app.use(express.json());

app.use(PostRoutes);

console.log(process.env.ENV_VAR);

const Environemnt = process.env.ENV_VAR == "dev" ? 3000 : 4000;

app.listen(Environemnt, () => {
  console.log(`server is started at ${Environemnt}`);
});
