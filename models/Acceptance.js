const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    science: {
        type: String,
        required: true,
    },
    center_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Center",
        required: true
    },
    freeTime: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Qabulxona", schema);