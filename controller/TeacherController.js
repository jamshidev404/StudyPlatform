const Teacher = require("../models/TeacherModel");
const Science = require("../models/ScienceModel");
const Group = require("../models/GroupsModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  let teacher = new Teacher(req.body);
  teacher
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: teacher });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res) => {
  const { page, limit } = req.query;
  const count = await Teacher.countDocuments();
  await Teacher.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .populate({ path: "science_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, count, data });
    });
};

//markazga oid bo'lgan hamma o'qituvchilarni olish
exports.getTeacherAll = async (req, res) => {
  await Teacher.find({ center_id: req.body.center })
    .populate({ path: "user" })
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data });
    });
};

// o'qituvchi guruhlari bilan olish
exports.teacherGroups = async (req, res) => {
  await Teacher.find({ group_id: req.params.id })
    .populate({})
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data });
    });
};

// id bo'yicha bittasini olish
exports.getOne = async (req, res, next) => {
  let teacher = await Teacher.findById({ _id: req.params.id })
    .populate({
      path: "user",
    })
    .populate({ path: "science_id" })
    .populate({ path: "group_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, teacher: teacher, data: data });
    });
};

exports.updateOne = async (req, res, next) => {
  await Teacher.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await Teacher.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
