const Markaz = require("../models/CenterModel");

exports.adding = (req, res) => {
  const markaz = new Markaz(req.body);

  markaz
    .save()
    .then(() => {
      res.status(200).json({ success: true, data: markaz });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res, next) => {
  const { page, limit } = req.query;
  const count = await Center.countDocuments();
  await Markaz.find({ center_id: req.params.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    //.populate({ path: "center" })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data: data, count });
    });
};

exports.updateOne = async (req, res, next) => {
  await Markaz.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};

exports.getOne = async (req, res, next) => {
  await Markaz.findById({ _id: req.params.id }).exec((err, data1) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, director: data1, data: data });
  });
};

exports.rm = async (req, res, next) => {
  await Markaz.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
