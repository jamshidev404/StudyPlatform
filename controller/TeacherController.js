const Teacher = require("../models/TeacherModel");
const Science = require("../models/ScienceModel");
const Group = require("../models/GroupsModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.create = async (req, res) => {
    const salt = await bcrypt.genSaltSync(12);
    const password = await bcrypt.hashSync(req.body.password, salt)
    let result = new Teacher(req.body);

    await result.save()
        .then(() => {
            return res.status(200).json({ success: true, data: result });
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err });
        })
};

exports.login = async (req, res, next) => {
    await Teacher.findOne({ _id: req.params.id })
    .exec( (err, data) => {
        if(err) {
            return res.status(400).json({ success: false})
        }
        if(!data) {
            return res.status(404).json({ success: false, message: "User not found"  })
        }
        if(!bcrypt.compareSync(req.body.password, data.password)) {
            return  res.status(400).json({ success: false, message: "Password wrong" })
        }

        const payload = { id: data._id }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES_IN })
        return erres.status(200).json({ success: true, token })
    })
}

exports.getAll = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query
    const science = await Science.find().populate("science_id") 
    const count = await Teacher.countDocuments()
    await Teacher.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err })
            return res.status(200).json({ success: true, data: data, count })
        });
};

exports.getOne = async (req, res, next) => {
console.log(req.body)
    let teacher = await Teacher.findById({ _id: req.params.id }).populate("sciences");
    
    await Group.find({ teacher_id: req.params.id })
    .populate("group_id")
    .exec((err, data) => {
        if (err) return res.status(404).json({ success: false, err });
        return res.status(200).json({ success: true, teacher, data: data })
    });
};

exports.getOneTeacher = async (req, res, next) => {
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