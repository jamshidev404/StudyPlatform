const CenterPay = require("../models/CentersPayModel");

exports.create = (req, res) => {
  let result = new CenterPay(req.body);

  result
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: result });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res) => {
  const { page, limit } = req.query;
  const count = await CenterPay.countDocuments();
  await CenterPay.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .populate({
      path: "center_id",
      select: ["centername", "centerphone", "contract"],
    })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, data: data, count });
    });
};

//bittasini barcha ma'lumotlar bilan olish
exports.getOnes = async (req, res) => {
  await CenterPay.find({ center_id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};

// id bo'yicha bittasini olish
exports.getOne = async (req, res) => {
  await CenterPay.findById({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.updateOne = async (req, res, next) => {
  await CenterPay.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await CenterPay.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
