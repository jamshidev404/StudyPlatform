const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    center_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Markaz",
        required: true
    }
    
},

 { timestamps: true }
);

module.exports = mongoose.model("Science", schema);