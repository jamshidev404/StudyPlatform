const Center = require("../models/CenterModel");
const Science = require("../models/ScienceModel");
const User = require("../models/UserModel");
const Qabulxona = require("../models/AdModel");
const Elon = require("../models/AdModel");
const CenterPay = require("../models/CentersPayModel");
const Exam = require("../models/ExamModel");
const Group = require("../models/GroupsModel");
const Moderator = require("../models/ModeratorModel");
const Pay = require("../models/PayModel");
const Pupil = require("../models/PupilModel");
const Teacher = require("../models/TeacherModel");

exports.create = (req, res) => {
  const center = new Center(req.body);

  center
    .save()
    .then(() => {
      res.status(200).json({ success: true, data: center });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res, next) => {
  const { page, limit } = req.query;
  const count = await Center.countDocuments();
  await Center.find({ center_id: req.params.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data: data, count });
    });
};

exports.updateOne = async (req, res, next) => {
  await Center.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};

exports.getOne = async (req, res, next) => {
  await Center.findById({ _id: req.params.id })
    .populate({ path: "user", select: ["login", "password"] })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, data: data });
    });
};

exports.rm = async (req, res, next) => {
  await Science.deleteMany({ science: req.params.id });
  await User.deleteMany({ user: req.params.id });
  await CenterPay.deleteMany({ centerpay: req.params.id });
  await Exam.deleteMany({ exam: req.params.id });
  await Group.deleteMany({ group: req.params.id });
  await Moderator.deleteMany({ moderator: req.params.id });
  await Pay.deleteMany({ pay: req.params.id });
  await Pupil.deleteMany({ pupil: req.params.id });
  await Teacher.deleteMany({ teacher: req.params.id });

  await Qabulxona.deleteMany({ qabul: req.params.id });
  await Elon.deleteMany({ elon: req.params.id });

  await Center.findByIdAndDelete({ _id: req.params.id });
  return res.status(200).json({ success: true, data: "Ma'lumot o'chirildi" });
};
