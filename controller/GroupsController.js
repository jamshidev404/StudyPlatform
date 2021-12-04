const Group = require("../models/GroupsModel");
const Pupil = require("../models/PupilModel");
const Teacher = require("../models/TeacherModel");
const Science = require("../models/ScienceModel");

exports.create = async (req, res) => {
    let result = new Group(req.body);

    await result.save()
        .then(() => {
            return res.status(200).json({ success: true, data: result });
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err });
        })
};

exports.getAll = async (req, res, next) => {
    const { page, limit } = req.query
    const count = await Group.countDocuments();
    await Group.find()//.filter()
        .sort({ createdAt: -1 })
        .populate({ path: "user_id" })
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data, count })
        });
};

exports.getStatusByAll = async (req, res, next) => {
    const { page, limit, status } = req.query
    const count = await Group.countDocuments();
    await Group.find({status: status})
        .sort({createdAt: -1})
        .skip((page -1 )*limit)
        .limit(parseInt(limit))
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data, count })
        });
};

exports.getOne = async (req, res, next) => {

    let group = await Group.findById({ _id: req.params.id });

    const pupil = await Pupil.find({ group_id: req.params.id }).populate("user_id")
    const teacher = await Group.find({ teacher_id: req.params.id }).populate({ path: "teacher_id", select: "name" })
    const science = await Teacher.find({ science_id: req.params.id }).populate("science_id")
    const count = await Group.countDocuments()
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true, group, science, teacher, count, pupils: pupil })
        });
};

exports.getGroup = async (req, res, next) => {
    await Group.findOne({ _id: req.params.id })

        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true, data: data })
        });
}

exports.getStatus = async (req, res, next) => {
    await Group.findOne({ _id: req.params.id })
    const arxiv = Group.find().select({ name: 1, status: "arxiv" })
    const active = Group.find().select({ name: 1, status: "active" })
    const unactive = Group.find().select({ name: 1, status: "unactive" })

        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true, arxiv: arxiv, active: active, unactive: unactive, data: data })
        });
}

exports.updateOne = async (req, res, next) => {
    await Group.updateOne(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
};

exports.rm = async (req, res, next) => {
    await Group.deleteOne({ _id: req.params.id })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, data: data })
        })
};