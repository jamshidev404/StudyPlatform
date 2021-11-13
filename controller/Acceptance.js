const Qabulxona = require("../models/Acceptance");

exports.create = async (req, res) => {
    let user = await Qabulxona(req.body);

    await user.save()
        .then(() => {
            return res.status(200).json({ success: true, data: user });
        })
        .catch((err) => {
            //console.log(err)
            return res.status(400).json({ success: false, err });
        })
};

exports.getAll = async (req, res, next) => {
    await Qabulxona.find()
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data })
        });
};

exports.me = async (req, res, next) => {
    await Qabulxona.findOne(req.params.id)
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true, data })
        });
};

exports.updateOne = async (req, res, next) => {
    await Qabulxona.updateOne(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
};

exports.rm = async (req, res, next) => {
    await Qabulxona.deleteOne({ _id: req.params.id })
    .exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, data: data })
    })
};