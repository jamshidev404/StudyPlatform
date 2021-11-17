const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    group_id: {
        type: mongoose.Schema.ObjectId,
        //required: true,
        ref: "Group"
    }
});

module.exports = mongoose.model("Science", schema);