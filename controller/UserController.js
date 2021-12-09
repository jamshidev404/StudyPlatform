const { promisify } = require("util")
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Director = require('../models/DirectorModel')
const Pupil = require('../models/PupilModel')
const Markaz = require('../models/Markazim')

exports.create = async (req, res, next) => {
    const salt = await bcrypt.genSaltSync(12);
    const password = await bcrypt.hashSync(req.body.password, salt);

    let user = new User({
        name: req.body.name,
         role: req.body.role,
        login: req.body.login ,
        password: req.body.password ,

    });
    user.password = password;
    user.save()
        .then(() => {

            if(user.role == "admin"){
                const director = new Director(req.body)

            director.save()
            return res.status(200).json({ success: true, data: user });
            }
            if(user.role == "pupil"){
                const pupil = new Pupil(req.body)

            pupil.save()
            return res.status(200).json({ success: true, data: user });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err });
        })
};

exports.login = async (req, res, next) => {
    console.log(req.body)
    await User.findOne({ login: req.body.login })
        .exec((err, data) => {
            if (err)
                return res.status(400).json({ success: false });

            if (!data)
                res.status(404).json({ success: false, data: 'User not found' });

            if (!bcrypt.compareSync(req.body.password, data.password)) {
                return res.status(400).json({ success: false, data: "Password wrong" })
            };

            const payload = { id: data._id };

            const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES_IN });
            return res.status(200).json({ success: true, token })
        });
};

exports.getAll = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query
    const count = await User.countDocuments();
    await User.find()
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data, count })
        });
};

exports.me = async (req, res, next) => {    
    const token = req.headers.authorization.split(" ")[1];
    const users = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET_KEY);
    console.log(token, user)
    let user = await User.findById(user.id)
        .then(()=> {
            if (users.role = "admin") {
                return Markaz.findById({ _id: req.body.id })
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err, message: "Xatolik mavjud!" })
        })
};

exports.getOne = async (req, res, next) => {
    await User.findOne({ _id: req.params.id })
    .exec((err, data) => {
        if (err) return res.status(404).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
}

exports.updateOne = async (req, res, next) => {
    await User.updateOne(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
};

exports.deleteOne = async (req, res, next) => {
    await User.deleteOne({ _id: req.params.id }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
};