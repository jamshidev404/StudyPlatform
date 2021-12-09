const mongoose = require("mongoose");

const schema = mongoose.Schema({
    teacher: {
        type: String,
        required: true
    },
    science: {
        type: String,
        required: true
    },
    startData: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    center_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Markaz",
        required: true
    },
    room: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Exam", schema);