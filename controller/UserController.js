const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.create = async (req, res, next) => {
    const salt = await bcrypt.genSaltSync(12);
    const password = await bcrypt.hashSync(req.body.password, salt);

    const user = new User(req.body);
    user.password = password;
    user.save()
        .then(() => {
            return res.status(200).json({ success: true, data: user });
        })
        .catch((err) => {
            res.status(400).json({ success: false, err });
        })
};

exports.login = async (req, res, next) => {
    await User.findOne({ login: req.body.login })
        .exec((err, data) => {
            if (err)
                return res.status(400).json({ success: false });

            if (!data)
                res.status(404).json({ success: false, data: 'User not found' });

            if (!bcrypt.compareSync(req.body.password, data.password)) {
                return res.status(400).json({ success: false, data: "password wrong" })
            };

            const payload = { id: data._id };

            const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY);

            return res.status(200).json({ success: true, data: token })
        });
};

exports.getAll = async (req, res, next) => {
    await User.find()
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data })
        });
};
 
exports.me = async (req, res, next) => {
    const token = req.headers.authorization.slice(" ")[1];
    const user = jwt.decode(token);
    await User.findOne({ _id: user.id })
    .exec( (err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
};

exports.updateOne = async (req, res, next) => {
    await User.updateOne(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).exec( (err, data) => {
        if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data })
    })
};

exports.deleteOne = async (req, res, next) => {
    await User.deleteOne({ _id: req.params.id }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data })
    })
}
