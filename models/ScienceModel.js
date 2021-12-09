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
    },
    center_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Markaz",
        required: true
    }
    
},

 { timestamp: true }
);

module.exports = mongoose.model("Science", schema);