const postModel = require("../models/post");

const createRecord = async (req, res) => {
  const { title, description, tags } = req.body;
  const results = await postModel.create({
    title: title,
    description: description,
    tags: tags,
  });

  console.log("results", results);

  res.status(200).json(results);
};

const updateRecord = async (req, res) => {
  const { title, description, tags } = req.body;
  const { id } = req.params;
  const results = await postModel.findOneAndUpdate(
    { title: title },
    { $set: { title, description, tags } },
    { new: true, upsert: true }
  );
  res.status(200).json(results);
};

const deletePost = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    let results = await postModel.findOneAndUpdate(
      { title: title },
      { $set: { title, description, tags } },
      { upsert: true, new: true }
    );

    console.log("results", results);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { createRecord, updateRecord, deletePost };
