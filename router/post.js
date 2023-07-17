const express = require("express");
const {
  createRecord,
  updateRecord,
  deletePost,
  getRecordsList,
  getRecordsFindList,
  createUser,
  helloWorld,
} = require("../controllers/post");

const router = express.Router();

router.get("/", helloWorld);

router.post("/", createRecord);

router.get("/find", getRecordsFindList);

router.put("/:id", updateRecord);
router.delete("/:id", deletePost);

router.post("/user", createUser);

module.exports = router;
