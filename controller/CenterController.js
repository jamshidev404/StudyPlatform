const Center = require("../models/CenterModel");

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
    .populate({ path: "user", select: "status" })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data: data, count });
    });
};

exports.getUserForPay = async (req, res) => {
  await Center.find({ _id: req.body.center }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
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
  await Center.findByIdAndDelete({ _id: req.params.id });
  return res.status(200).json({ success: true, data: "Ma'lumot o'chirildi" });
};
