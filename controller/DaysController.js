const DayToday = require("../models/DaysModel");

exports.create = (req, res) => {
  const day = new DayToday(req.body);

  day
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: day });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res) => {
  await DayToday.find({ group_id: req.body.group_id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data });
  });
};

exports.rm = async (req, res, next) => {
  await DayToday.deleteOne({ _id: req.params.id }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: data });
  });
};
