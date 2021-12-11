const Pupil = require("../models/PupilModel");

exports.create = async (req, res) => {
  const salt = await bcrypt.genSaltSync(12);
  const password = await bcrypt.hashSync(req.body.password, salt);

  let pupil = new Pupil(req.body);
  pupil.password = password;
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
  const { page = 1, limit = 10 } = req.query;
  const count = await Pupil.countDocuments();
  await Pupil.find()
    .sort({ createdAt: -1 })
    .populate({ path: "user_id" })
    .populate({ path: "group_id", select: "name" })
    .skip((page - 1) * limit)
    .limit(limit * 1)

    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, count, data });
    });
};

exports.getOne = async (req, res, next) => {
  await Pupil.findOne({ _id: req.params.id }).exec((err, data) => {
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
