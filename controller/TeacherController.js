const Teacher = require("../models/TeacherModel");
const Science = require("../models/ScienceModel");

exports.create = async (req, res) => {
    let result = new Teacher(req.body);

    await result.save()
        .then(() => {
            return res.status(200).json({ success: true, data: result });
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err });
        })
};

exports.getAll = async (req, res, next) => {
   // console.log(req.body);
    const { page = 1, limit = 10 } = req.query
    const science = await Science.find().populate("science_id") 
    const count = await Teacher.countDocuments()
    await Teacher.find()
        .populate("group_id")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err })
            return res.status(200).json({ success: true, science, data: data, count })
        });
};

exports.getOne = async (req, res, next) => {
    await Teacher.findOne({ _id: req.params.id })
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true, data: data })
        });
};

exports.updateOne = async (req, res, next) => {
    await Teacher.updateOne(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
};

exports.rm = async (req, res, next) => {
    await Teacher.deleteOne({ _id: req.params.id })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, data: data })
        })
};