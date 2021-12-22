const Pupil = require("../models/PupilModel");
const Science = require("../models/ScienceModel");
const Teacher = require("../models/TeacherModel");
const Group = require("../models/GroupsModel");

exports.getAll = async (req, res) => {
  const pupil = await Pupil.countDocuments();
  const science = await Science.countDocuments();
  const teacher = await Teacher.countDocuments();
  const group = await Group.countDocuments();

  res.status(200).json({ success: true, pupil, science, group, teacher });
};
