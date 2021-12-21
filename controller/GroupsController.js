const Group = require("../models/GroupsModel");
const Pupil = require("../models/PupilModel");
const Teacher = require("../models/TeacherModel");
const Science = require("../models/ScienceModel");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  let group = new Group(req.body);

  await group
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: group });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res, next) => {
  const { page, limit } = req.query;
  const count = await Group.countDocuments();
  await Group.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .populate({ path: "teacher_id", select: "name" })
    .populate({ path: "science_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

//hamma fanlarni statuslari bilan olish
exports.getStatusByAll = async (req, res, next) => {
  const { page, limit, status } = req.query;
  const count = await Group.countDocuments();
  await Group.find({ status: status, center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate({ path: "teacher_id", select: "name" })
    .populate({ path: "science_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

// id bo'yicha bittasini olish
exports.getGroup = async (req, res, next) => {
  // const count = await Group.countDocuments();
  const datas = await Group.findById({ _id: req.params.id })
    .populate({
      path: "teacher_id",
      select: "name",
    })
    .populate("science_id");
  await Pupil.find({ group_id: req.params.id }).exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, data: datas, pupil: data });
  });
};

exports.getStatus = async (req, res, next) => {
  const arxiv = await Group.find({ status: "arxiv" });
  const active = await Group.find({ status: "active" });
  const unactive = await Group.find({ status: "unactive" });

  return res.status(200).json({
    success: true,
    arxiv: arxiv,
    active: active,
    unactive: unactive,
  });
};

//gruppani statusiga ko'ra olish
exports.getGroupStatus = async (req, res, next) => {
  await Group.findOne({ _id: req.params.id })
    .select({ status: 1 })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, data: data });
    });
};

exports.updateStatus = async (req, res) => {
  await Group.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};

//o'qituvchilarni gruppasi bilan olish
exports.teacherGroups = async (req, res) => {
  await Group.find({ teacher_id: req.params.id })
    .populate({ path: "science_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data });
    });
};

//fanni statusi bilan olish
exports.scienceStatus = async (req, res) => {
  await Group.aggregate([
    { $match: { science_id: mongoose.Types.ObjectId(req.params.id) } },
    {
      $group: { _id: "$status", count: { $sum: 1 } },
    },
  ]).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.updateOne = async (req, res, next) => {
  await Group.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await Group.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
