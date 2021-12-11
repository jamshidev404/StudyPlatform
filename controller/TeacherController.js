const Teacher = require("../models/TeacherModel");
const Science = require("../models/ScienceModel");
const Group = require("../models/GroupsModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSaltSync(12);
  const password = await bcrypt.hashSync(req.body.password, salt);

  let teacher = new Teacher(req.body);
  teacher.password = password;
  teacher
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: teacher });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.login = async (req, res, next) => {
  await Teacher.findOne({ _id: req.params.id }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ success: false });
    }
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!bcrypt.compareSync(req.body.password, data.password)) {
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


exports.getAll = async (req, res) => {
  const { page, limit } = req.query;
  const count = await Teacher.countDocuments();
  await Teacher.find({ center_id: req.body.center }).populate({ path: "user" })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, count,  data });
    });
};

exports.getTeacherAll = async (req, res) => {
  await Teacher.find({ center_id: req.body.center }).populate({ path: "user" })
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data });
    });
}; 

exports.getOne = async (req, res, next) => {
  let teacher = await Teacher.findById({ _id: req.params.id }).populate({path: "user" })
  await Teacher.find({ science_id: req.body.science_id })//.populate({ path: "science_id",  })
  //await Teacher.find({ group_id: req.body.group_id })
    //.populate("group_id")
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, teacher, data: data });
    });
};

exports.updateOne = async (req, res, next) => {
  await Teacher.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await Teacher.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
