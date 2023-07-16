const postModel = require("../models/post");

const getRecordsList = async (req, res) => {
  let {
    page = 1,
    limit = 10,
    sortField = "createdAt",
    order = "desc",
    search = "",
  } = req.query;
  let sortOrder = order == "asc" ? 1 : -1;
  let skip = (+page - 1) * +limit;
  limit = +limit;

  const results = await postModel.find({
    title: { $regex: search, $options: "i" },
  });

  res.status(200).json({
    results,
    page,
    limit,
  });
};

const getRecordsFindList = async (req, res) => {
  let {
    page = 1,
    limit = 10,
    sortField = "createdAt",
    order = 1,
    search = "",
  } = req.query;
  console.log("req.query", req.query);

  const query = {};

  // Apply search filter if provided
  if (search) {
    query["text"] = { $regex: search, $options: "i" };
  }

  const pipeline = [
    { $match: query },
    {
      $facet: {
        data: [
          { $sort: { [sortField]: parseInt(order) } },
          { $skip: (page - 1) * limit },
          { $limit: parseInt(limit) },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = (await postModel.aggregate(pipeline))[0] ?? [];

  const results = result?.data;
  const totalCount = result.totalCount[0] ? result.totalCount[0].count : 0;
  const totalPages = totalCount / limit;
  res.status(200).json({
    results,
    page,
    limit,
    totalCount,
    totalPages: totalPages,
    hasMore: totalPages > page,
  });
};

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

module.exports = {
  createRecord,
  updateRecord,
  deletePost,
  getRecordsList,
  getRecordsFindList,
};
