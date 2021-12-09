const mongoose = require("mongoose");

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
        required: true
    },
    science_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Science",
        index: true,
        required: true
    },
    group_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Science",
        index: true,
        //required: true
    },
    center_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Markaz",
        required: true
    },
    gender: {
        type: Number,
        enum: [1, 2],
        required: true
    },
    groups: {
        type: Array
    },
    experience: {
        type: String,
        //required: true
    },
    role: {
        type: String,
        default: "teacher"
    },
    phone: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Teacher", schema);