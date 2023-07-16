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
    Hi: "hell from Dev environment",
    server: `this app is using aws EC2 ubuntu server`,
    Nginx: `using Nginx for revers proxy instead of Apache`,
    SSL: "using free version of SSL certbot",
    CICD: "using gitHUb Actions for CI/CD on self hosted container",
  });
});
// router.get("/", getRecordsList);
router.get("/find", getRecordsFindList);

router.put("/:id", updateRecord);
router.delete("/:id", deletePost);

module.exports = router;
