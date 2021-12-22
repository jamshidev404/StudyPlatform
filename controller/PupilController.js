const Pupil = require("../models/PupilModel");
const UserModel = require("../models/UserModel");

exports.create = async (req, res) => {
  const lastAdd = await Pupil.findOne().sort({ createdAt: -1 }).exec();
  const num = lastAdd ? lastAdd.number + 1 : 1;

  let pupil = new Pupil({
    number: num,
    name: req.body.name,
    group_id: req.body.group_id,
    ID: req.body.ID,
    user: req.body.user,
    phone: req.body.phone,
    address: req.body.address,
    date: req.body.date,
    gender: req.body.gender,
    center_id: req.body.center_id,
  });

  pupil
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: pupil });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res, next) => {
  const { page, limit } = req.query;
  const count = await Pupil.countDocuments();
  await Pupil.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .populate({ path: "group_id", select: ["name", "edutype"] })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, count, data });
    });
};

exports.ExportAll = async (req, res, next) => {
  const count = await Pupil.countDocuments();
  await Pupil.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .populate({ path: "group_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, count, data });
    });
};

exports.getOne = async (req, res, next) => {
  await Pupil.findOne({ _id: req.params.id })
    .populate({ path: "user", select: ["login", "password"] })
    .populate({ path: "group_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, data: data });
    });
};

exports.getPay = async (req, res, next) => {
  await Pupil.findOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, isPayed: data.isPayed });
  });
};

exports.updateOne = async (req, res, next) => {
  await Pupil.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await Pupil.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
