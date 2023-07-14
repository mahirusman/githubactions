const express = require("express");
const { createRecord, updateRecord, deletePost } = require("../controllers");

const router = express.Router();

router.post("/", createRecord);

router.put("/:id", updateRecord);
router.delete("/:id", deletePost);

module.exports = router;
