const { populate } = require("../models/GroupsModel");
const Group = require("../models/GroupsModel");
const Pay = require("../models/PayModel");
// const Pupil = require("../models/PupilModel");

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

exports.getAll = async (req, res, next) => {
  const { page, limit } = req.query;
  const count = await Pay.countDocuments();
  await Pay.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .populate({ path: "pupil_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

exports.getOne = async (req, res, next) => {
  await Pay.findOne({ _id: req.params.id });
  await Group.find({ group_id: req.params.id })
    .populate({ path: "group_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, data: data });
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
