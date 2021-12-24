const Accounting = require("../models/AccountingModel");

exports.create = async (req, res) => {
  let result = new Accounting(req.body);

  await result
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
  const count = await Accounting.countDocuments();
  await Accounting.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

exports.getOne = async (req, res, next) => {
  await Accounting.findOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};

exports.updateOne = async (req, res, next) => {
  await Accounting.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await Accounting.findByIdAndDelete({ _id: req.params.id }).exec(
    (err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data: data });
    }
  );
};
