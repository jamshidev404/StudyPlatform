const mongoose = require("mongoose");

const schema = mongoose.Schema({
    ispaid: {
        type: Boolean,
        enum: ["true", "false"],
        default: "false",
        required: true
    },
    paytype: {
        type: String,
        enum: ["Naqd", "Plastik"],
        default: "Naqd",
        required: true
    },
    payamount: {
        type: String,
        required: true
    },
    center_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Center",
        required: true
    },
    group_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        index: true,
        required: true
    },
    pupil_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Pupil",
        index: true,
        required: true
    }
},
    { timestamp: true }
);

exports = mongoose.model("Pays", schema);