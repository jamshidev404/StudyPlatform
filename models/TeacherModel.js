const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    group_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        index: true,
        required: true
    },
    science_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Science",
        index: true,
        required: true
    },
    sciences: {
        type: Array,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    groups: {
        type: Array
    },
    experience:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "teacher"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Teacher", schema);