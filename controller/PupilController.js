const Pupil = require("../models/PupilModel");
const User = require("../models/UserModel");

exports.create = async (req, res) => {
    let user = new User({
        name: req.body.name,
        login: req.body.login,
        role: req.body.role,
        password: req.body.password,
    });

    await user.save()
        .then(async () => {
            let pupil = new Pupil({
                name: req.body.name,
                address: req.body.address,
                user_id: user._id,
                group_id: req.body.group_id,
                phone: req.body.phone,
                isPayed: req.body.isPayed
            })

            await pupil.save()


            console.log("pupil->", pupil)

            return res.status(200).json({ success: true, data: pupil })
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err });
        })
};

exports.getAll = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query
    const count = await Pupil.countDocuments()
    await Pupil.find()
        .sort({ createdAt: -1 })
        .populate({ path: "user_id" })
        .populate({ path: "group_id" })
        .skip((page - 1) * limit)
        .limit(limit * 1)

        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data, count })
        });
};

exports.getOne = async (req, res, next) => {
    await Pupil.findOne({ _id: req.params.id })
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true, data: data })
        });
};

exports.updateOne = async (req, res, next) => {
    await Pupil.updateOne(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
};

exports.rm = async (req, res, next) => {
    await Pupil.deleteOne({ _id: req.params.id })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, data: data })
        })
};