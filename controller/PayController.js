const { populate } = require("../models/GroupsModel");
const Group = require("../models/GroupsModel");
const Pay = require("../models/PayModel");
const mongoose = require("mongoose");
const Pupil = require("../models/PupilModel");
const User = require("../models/UserModel");

exports.create = (req, res) => {
  let result = new Pay(req.body);

  result
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: result });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

// exports.getAll = async (req, res, next) => {
//   await Pay.aggregate([
//     { $match: { center_id: mongoose.Types.ObjectId(req.params.id) } },

//     { $group: { _id: "$pupil_id", total: { $sum: "$payamount" } } },
//     {
//       $lookup: {
//         from: "Pay",
//         localField: "_id",
//         foreignField: "name",
//         as: "pupil",
//       },
//     },
//   ]).exec((err, data) => {
//     if (err) return res.status(400).json({ success: false, err });
//     return res.status(200).json({ success: true, data });
//   });
// };

exports.getAll = async (req, res) => {
  const { page, limit } = req.query;
  const count = await Pay.countDocuments();
  await Pay.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .populate({ path: "pupil_id", select: ["name", "phone"] })
    .populate({ path: "group_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, data: data, count });
    });
};

// Zapas
// exports.getOnes = async (req, res, next) => {
//   await Pay.aggregate([
//     { $group: { _id: "$pupil_id", pupils: { $push: "$$ROOT" } } },
//     {
//       $addFields: {
//         allsum: { $sum: "$pupils.payamount" },
//       },
//     },
//   ]).exec((err, data) => {
//     if (err) return res.status(404).json({ success: false, err });
//     return res.status(200).json({ success: true, data: data });
//   });
// };

exports.getOnes = async (req, res) => {
  await Pay.find({ pupil_id: req.params.id })
    .populate({ path: "pupil_id", select: "name" })
    .populate({ path: "group_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data });
    });
};

exports.updateOne = async (req, res, next) => {
  await Pay.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await Pay.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
