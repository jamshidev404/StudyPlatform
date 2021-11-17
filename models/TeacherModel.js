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
    science: {
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Teacher", schema);