const Center = require("../models/AddCenterModel");

exports.create = async (req, res) => {
    let result = new Center(req.body);

    await result.save()
        .then(() => {
            return res.status(200).json({ success: true, data: result });
        })
        .catch((err) => {
            //console.log(err)
            return res.status(400).json({ success: false, err });
        })
};

exports.updateOne = async (req, res, next) => {
    await Center.updateOne(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
};

exports.getAll = async (req, res, next) => {
    await Center.find()
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data })
        });
};

exports.getOne = async (req, res, next) => {
    await Center.findOne(req.params.id)
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true, data })
        });
};

exports.rm = async (req, res, next) => {
    await Center.deleteOne({ _id: req.params.id })
    .exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, data: data })
    })
};