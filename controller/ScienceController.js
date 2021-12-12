const Science = require("../models/ScienceModel");
const Group = require("../models/GroupsModel");

exports.create = async (req, res) => {
  let result = new Science(req.body);

  await result
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: result });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const count = await Science.countDocuments();
  await Science.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .populate("group_id")
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

exports.getAllTest = async (req, res, next) => {
  await Group.aggregate([
    {
      $match: { center_id: req.body.center },
    },
    { $group: { _id: "$science_id", count: { $sum: 1 } } },

    {
      $lookup: {
        from: "sciences",
        localField: "_id",
        foreignField: "_id",
        as: "science",
      },
    },

    { $unwind: "$science" },
  ]).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.getScienceAll = async (req, res, next) => {
  const count = await Group.countDocuments();
  await Science.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

exports.getOne = async (req, res, next) => {
  await Group.find({ science_id: req.params.id })
    .select({ name: 1, science_id: 1 })
    .populate({ path: "science_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, data });
    });
};

exports.getScience = async (req, res, next) => {
  await Science.findOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.updateOne = async (req, res, next) => {
  await Science.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await Science.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
