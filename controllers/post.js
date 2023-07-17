const mongoose = require("mongoose");
const postModel = require("../models/post");
const UserModel = require("../models/user");
const ObjectId = mongoose.Types.ObjectId;

const helloWorld = (req, res, next) => {
  return res.status(200).json({
    Hi: `Hell from ${process.env.NODE_ENV} environment 👋`,
    server: `This app running on aws EC2 ubuntu server 🌟`,
    Nginx: `Nginx for revers proxy instead of Apache`,
    SSL: "Using free version of SSL certbot",
    CICD: "Using gitHUb Actions for CI/CD on self hosted container 🚀",
    note: "Take Clone from https://github.com/mahirusman/githubactions make change push code and see live changes on dev.mernusman.com",
  });
};

const getRecordsFindList = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      sortField = "createdAt",
      order = 1,
      search = "",
    } = req.query;

    const query = {};

    if (search) {
      query["text"] = { $regex: search, $options: "i" };
    }

    const pipeline = [
      { $match: query },

      {
        $lookup: {
          from: "users",
          let: { userId: "$user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userId"],
                },
              },
            },
          ],
          as: "creator",
        },
      },
      {
        $match: {
          creator: {
            $ne: [],
          },
        },
      },

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
    const totalPages = Math.ceil(totalCount / limit);
    return res.status(200).json({
      success: true,
      results: results,
      page: parseInt(page),
      limit: parseInt(limit),
      totalDocuments: totalCount,
      totalPages: totalPages,
      hasMore: totalPages > page,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const createRecord = async (req, res) => {
  const { title, description, tags, user, userData } = req.body;
  const results = await postModel.create({
    title: title,
    description: description,
    tags: tags,
    user,
    userData,
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

const createUser = async (req, res) => {
  try {
    const { name, address } = req.body;
    let results = await UserModel.create({
      name,
      address,
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  createRecord,
  updateRecord,
  deletePost,
  getRecordsFindList,
  createUser,
  helloWorld,
};
