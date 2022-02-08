const SuperAdmin = require("../models/SuperAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  let superadmin = new SuperAdmin(req.body);
  superadmin
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: superadmin });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res, next) => {
  await SuperAdmin.find()
    .populate({ path: "user" })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)

    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, count, data }); //
    });
};

exports.getOne = async (req, res, next) => {
  await SuperAdmin.findOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};

exports.updateOne = async (req, res, next) => {
  await SuperAdmin.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await SuperAdmin.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, message: "O'chirildi" });
  });
};
