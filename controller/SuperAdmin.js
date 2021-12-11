const SuperAdmin = require("../models/SuperAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  const salt = bcrypt.genSaltSync(12);
  const password = bcrypt.hashSync(req.body.password, salt);

  let superadmin = new SuperAdmin(req.body);
  superadmin.password = password;
  superadmin
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: superadmin });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.login = async (req, res, next) => {
  await SuperAdmin.findOne({ _id: req.params.id }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "User  not found" });
    }
    if (!bcrypt.compareSync(req.body.id, data.password)) {
      return res
        .status(400)
        .json({ success: false, message: "Password wrong" });
    }

    const payload = { id: data._id };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
    return res.status(200).json({ success: true, token });
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
    return res.status(200).json({ success: true, data: data });
  });
};