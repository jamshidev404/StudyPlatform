const Markaz = require("../models/CenterModel");
const Director = require("../models/DirectorModel");

exports.adding = (req, res) => {
  const markaz = new Markaz(req.body);

  markaz
    .save()
    .then(() => {
      res.status(200).json({ success: true, data: markaz });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: "Xatolik ro'y berdi!" });
    });
};

exports.getAll = async (req, res, next) => {
  await Markaz.find()
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data });
    });
};

exports.updateOne = async (req, res, next) => {
  await Markaz.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.getOne = async (req, res, next) => {
  const data = await Markaz.findOne({ _id: req.params.id });

  await Director.find({ director_id: req.params.id }) //.select({ name: 1, director_id: 1 })
    .exec((err, data1) => {
      if (err) return res.status(404).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, director: data1, data: data });
    });
};

exports.rm = async (req, res, next) => {
  await Markaz.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
