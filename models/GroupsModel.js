const mongoose = require("mongoose");

const schema = mongoose.Schema({
    groupename: {
        type: String,
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
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Group", schema);