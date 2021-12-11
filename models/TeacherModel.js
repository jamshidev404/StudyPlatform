const mongoose = require("mongoose");

const schema = mongoose.Schema({
 
    science_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Science",
        index: true,
        //required: true
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
        //required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
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
    phone: {
        type: Number,
        required: true
    }
},
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", schema);