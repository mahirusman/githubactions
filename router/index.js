const express = require("express");
const {
  createRecord,
  updateRecord,
  deletePost,
  getRecordsList,
  getRecordsFindList,
} = require("../controllers");

const router = express.Router();

router.post("/", createRecord);

router.get("/", (req, res) => {
  return res.status(200).json({
    Hi: `Hell from ${process.env.NODE_ENV} environment 👋`,
    server: `This app running on aws EC2 ubuntu server 🌟`,
    Nginx: `Nginx for revers proxy instead of Apache`,
    SSL: "Using free version of SSL certbot",
    CICD: "Using gitHUb Actions for CI/CD on self hosted container 🚀",
    note: "Take Clone from https://github.com/mahirusman/githubactions make change push code and see live changes on dev.mernusman.com",
  });
});
// router.get("/", getRecordsList);
router.get("/find", getRecordsFindList);

router.put("/:id", updateRecord);
router.delete("/:id", deletePost);

module.exports = router;
