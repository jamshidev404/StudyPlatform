const mongoose = require("mongoose");

const schema = mongoose.Schema({
    namegroup: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    days: {
        type: Array,
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    edutype: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },
    status: {
        type: String,
        enum: [ "arxiv", "active",
                "unactive" ],
        default: "unactive",
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
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        index: true,
        //required: true
    },
    teacher_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Teacher",
        index: true,
        //required: true
    },
    science_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Science",
        index: true,
        //required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Group", schema);