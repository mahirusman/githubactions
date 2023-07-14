const express = require("express");
require("./db");
const PostRoutes = require("./router");
const app = express();

app.use(express.json());

app.use(PostRoutes);

app.get("/", async (req, res) => {
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

  const results =
    (
      await postModel.aggregate([
        {
          $match: {
            title: {
              $regex: search,
              $options: "i",
            },
          },
        },
        {
          $facet: {
            totalPages: [
              { $count: "total" },

              {
                $project: {
                  totalPages: {
                    $ceil: {
                      $divide: ["$total", limit],
                    },
                  },
                },
              },
            ],
            totalRecords: [
              {
                $count: "totalRecords",
              },
            ],
            data: [
              {
                $sort: {
                  [sortField]: +sortOrder,
                },
              },
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
        {
          $set: {
            totalPages: {
              $arrayElemAt: ["$totalPages", 0],
            },
            totalRecords: {
              $arrayElemAt: ["$totalRecords", 0],
            },
          },
        },
        {
          $set: {
            totalPages: "$totalPages.totalPages",
            totalRecords: "$totalRecords.totalRecords",
          },
        },
      ])
    )[0] ?? [];
  res.status(200).json({
    ...results,
    page,
    limit,
  });
});

app.listen(4000, () => {
  console.log("server is started at 4000");
});
