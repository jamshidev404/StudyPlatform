const Center = require("../models/CenterModel");
const Director = require('../models/DirectorModel');


exports.create = (req, res) => {
    console.log(req.body)
    let center = new Center(req.body);
    
    center.save()
        .then(() => {
            return res.status(200).json({ success: true, data: center });
        })
        .catch((err) => {
            console.log(err);
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

    await Center.findOne({ _id: req.params.id })

  const director = await Director.find({ director_id: req.params.id }).select({ name: 1, director_id: 1 })
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true, director,  data: data })
        });
};

exports.rm = async (req, res, next) => {
    await Center.deleteOne({ _id: req.params.id })
    .exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, data: data })
    })
};