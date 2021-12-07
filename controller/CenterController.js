const Center = require("../models/CenterModel");
const Director = require('../models/DirectorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const password = bcrypt.hashSync(req.body.password, salt);

    let center = new Center(req.body);
    center.password = password
    center.save()
        .then(() => {
            return res.status(200).json({ success: true, data: center });
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err });
        })
};

exports.login = async (req, res, next) => {
    await Center.findOne({ _id: req.params.id })
    .exec( (err, data) => {
        if (err) {
        return res.status(400).json({ success: false, err })
        }
        if (!data) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (!bcrypt.compareSync(req.body.password, data.password)) {
            return res.status(400).json({ success: false, message: "Password wrong" })
        }

        const payload = { id: data._id }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES_IN })
        return res.status(200).json({ success: true, token })
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

  //await Director.find({ director_id: req.params.id }).select({ name: 1, director_id: 1 })
        .exec((err, data) => {
            if (err) return res.status(404).json({ success: false, err });
            return res.status(200).json({ success: true,  data: data })
        });
};

exports.rm = async (req, res, next) => {
    await Center.deleteOne({ _id: req.params.id })
    .exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, data: data })
    })
};