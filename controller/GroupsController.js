const Group = require("../models/GroupsModel");
const Pupil = require("../models/PupilModel");
const Teacher = require("../models/TeacherModel");
const Science = require("../models/ScienceModel");

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
    .populate({ path: "teacher_id", select: "name" })

    .skip((page - 1) * limit)
    .limit(limit * 1)
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

exports.getStatusByAll = async (req, res, next) => {
  const { page, limit, status } = req.query;
  const count = await Group.countDocuments();
  await Group.find({ status: status })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

exports.getOne = async (req, res, next) => {
  let group = await Group.findById({ _id: req.params.id });

  const pupil = await Pupil.find({ group_id: req.params.id }).populate(
    "user_id"
  );
  const teacher = await Group.find({ teacher_id: req.params.id }).populate({
    path: "teacher_id",
    select: "name",
  });
  const science = await Teacher.find({ science_id: req.params.id }).populate(
    "science_id"
  );
  const count = await Group.countDocuments().exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res
      .status(200)
      .json({ success: true, group, science, teacher, count, pupils: pupil });
  });
};

exports.getGroup = async (req, res, next) => {
  await Group.findOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
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
