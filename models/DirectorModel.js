const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        message: "Password must be only string"
    },
    gender: {
        type: Number,
        enum: [ 1, 2 ],
        required: true
    },
    phone: {
         type: String,
         required: true
    },
    address: {
        type: String,
         required: true
    },
    role: {
        type: String,
        default: "admin"
    },
    birthday: {
        type: String,
         required: true
    },
    center_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Center",
        required: true
    }
},
    { timestaps: true }
);

module.exports = mongoose.model("Director", schema);