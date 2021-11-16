const mongoose = require("mongoose");

const schema = mongoose.Schema({
    group_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        required: true,
        index: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    isPayed: {  
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Pupil", schema);