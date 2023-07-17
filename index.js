const express = require("express");
const PostRoutes = require("./router/post");
const app = express();
require("./db");

app.use(express.json());

app.use(PostRoutes);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.use("*", (req, res, next) => {
  return res
    .status(400)
    .json({ notfound: `endpoint ${req.originalUrl} is not available` });
});

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const PORT = process.env.NODE_ENV == "prod" ? 4000 : 3000;

app.listen(PORT, () => {
  console.log(`server is started at ${PORT}`);
});
