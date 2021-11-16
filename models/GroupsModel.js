const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    science: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: [String],
        required: true
    },
    date: {
        type: [String],
        required: true
    },
    days: {
        type: Array,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    edutype: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },
    price: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    monthlesson: {
        type: String,
        required: true
    },
    maxpupil: {
        type: String,
        //required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Group", schema);