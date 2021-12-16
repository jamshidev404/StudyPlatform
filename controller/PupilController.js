const Pupil = require("../models/PupilModel");

exports.create = async (req, res) => {
  let pupil = new Pupil(req.body);
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
