const { promisify } = require("util");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CenterDirector = require("../models/CenterModel");
const Pupil = require("../models/PupilModel");
const Markaz = require("../models/CenterModel");
const Teacher = require("../models/TeacherModel");
const SuperAdmin = require("../models/SuperAdmin");
const Moderator = require("../models/ModeratorModel");

exports.create = async (req, res) => {
  //const salt = await bcrypt.genSaltSync(12);
  //const password = await bcrypt.hashSync(req.body.password, salt);

  let user = new User({
    role: req.body.role,
    login: req.body.login,
    password: req.body.password,
  });
  //user.password = password;
  user
    .save()
    .then(() => {
      if (user.role == "superadmin") {
        req.body.user = user._id;
        const superadmin = new SuperAdmin(req.body);

        superadmin.save();
        return res.status(200).json({ success: true, data: superadmin });
      }
      if (user.role == "admin") {
        req.body.user = user._id;
        const director = new CenterDirector(req.body);

        director.save();
        return res.status(200).json({ success: true, data: director });
      }

      if (user.role == "moderator") {
        req.body.user = user._id;
        const moderator = new Moderator(req.body);

        moderator.save();
        return res.status(200).json({ success: true, data: moderator });
      }

      if (user.role == "teacher") {
        req.body.user = user._id;
        const teacher = new Teacher(req.body);

        teacher.save();
        return res.status(200).json({ success: true, data: teacher });
      }

      if (user.role == "pupil") {
        req.body.user = user._id;
        const pupil = new Pupil(req.body);

        pupil.save();
        return res.status(200).json({ success: true, data: pupil });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.login = async (req, res, next) => {
  console.log(req.body);
  await User.findOne({ login: req.body.login }).exec((err, data) => {
    if (err)
      return res.status(400).json({ success: false, message: "Xatolik bor" });

    if (!data) res.status(404).json({ success: false, data: "User not found" });

    if (!bcrypt.compareSync(req.body.password, data.password)) {
      return res.status(400).json({ success: false, data: "Password wrong" });
    }

    const payload = { id: data._id };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
    return res.status(200).json({ success: true, token });
  });
};

exports.getAll = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const count = await User.countDocuments();
  await User.find()
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data, count });
    });
};

exports.me = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET_KEY);
  //console.log( users )// id ni qaytaradi
  let userd = await User.findOne({ _id: user.id });
  let director = null;
  if (userd.role == "admin") {
    director = await Director.findOne({ user: userd._id }).populate({
      // path: "center_id",
      select: "name",
    });
  }
  if (userd.role == "superadmin") {
    director = await SuperAdmin.findOne({ user: userd._id }).select({
      name: 1,
    });
  }
  if (userd.role == "teacher") {
    director = await Teacher.findOne({ user: userd._id }).populate({
      path: "center_id",
      select: "name",
    });
  }
  return res.status(200).json({
    success: true,
    data: {
      userd,
      director,
    },
  });
};

exports.getOne = async (req, res, next) => {
  await User.findOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.updateOne = async (req, res, next) => {
  await User.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.deleteOne = async (req, res, next) => {
  await User.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};
