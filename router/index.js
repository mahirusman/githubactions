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
  res.send(<h1>Working perfect</h1>);
});
//
router.get("/", getRecordsList);
router.get("/find", getRecordsFindList);

router.put("/:id", updateRecord);
router.delete("/:id", deletePost);

module.exports = router;
