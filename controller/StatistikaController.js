const Pupil = require("../models/PupilModel");
const Science = require("../models/ScienceModel");
const Teacher = require("../models/TeacherModel");
const Group = require("../models/GroupsModel");

exports.getAll = async (req, res) => {
  const pupil = await Pupil.countDocuments({ center_id: req.body.center });
  const science = await Science.countDocuments({ center_id: req.body.center });
  const teacher = await Teacher.countDocuments({ center_id: req.body.center });
  const group = await Group.countDocuments({ center_id: req.body.center });

  res.status(200).json({ success: true, pupil, science, group, teacher });
};
