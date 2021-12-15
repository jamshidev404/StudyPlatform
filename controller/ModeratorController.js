const Moderator = require("../models/ModeratorModel");

exports.create = (req, res) => {
  let result = new Moderator(req.body);

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
  const count = await Moderator.countDocuments();
  await Moderator.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

exports.me = async (req, res, next) => {
  await Moderator.findOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};

exports.getOne = async (req, res, next) => {
  await Moderator.findById({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};

exports.updateOne = async (req, res, next) => {
  await Moderator.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await Moderator.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
