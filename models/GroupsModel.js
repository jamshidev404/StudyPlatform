const mongoose = require("mongoose");

const schema = mongoose.Schema({
    groupname: {
        type: Number,
        required: true
    },
    science: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    monthlesson: {
        type: Number,
        required: true
    },
    maxpupil: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Group", schema);