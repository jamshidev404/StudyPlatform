const Qabulxona = require("../models/Acceptance");

exports.create = async (req, res) => {
    let result = new Qabulxona(req.body);

    await result.save()
        .then(() => {
            return res.status(200).json({ success: true, data: result });
        })
        .catch((err) => {
            //console.log(err)
            return res.status(400).json({ success: false, err });
        })
};

exports.getAll = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query
    await Qabulxona.find()
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data })
        });
};

exports.me = async (req, res, next) => {
    console.log(req.body)
    await Qabulxona.findOne({ _id: req.params.id })
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true, data: data })
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