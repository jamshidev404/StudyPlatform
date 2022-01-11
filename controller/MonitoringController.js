const Monitoring = require("../models/MonitoringModel");

exports.create = (req, res) => {
  const monitoring = new Monitoring(req.body);
  // if (req.body.type == "+" || req.body.type == "-") {
  //   $set: {
  //     davomat: req.body.type;
  //   }
  // }

  monitoring
    .save()
    .then(() => {
      return res.status(200).json({ success: true, data: monitoring });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

exports.getAll = async (req, res) => {
  await Monitoring.find({ center_id: req.body.center })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .populate({ path: "pupil_id", select: "name" })
    .populate({ path: "group_id", select: "name" })
    .exec((err, data) => {
      if (err) return res.status(404).json({ success: false, err });
      return res.status(200).json({ success: true, data: data });
    });
};
