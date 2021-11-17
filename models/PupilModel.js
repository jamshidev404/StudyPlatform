const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
    },
    date: {
        type: String,
        require: true
    },
    login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "pupil"
    },
    
},
    { timestamps: true }
);

module.exports = mongoose.model("Pupil", schema);