const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
         type: String
    },
    inn: {
        type: Number
    },
    address: { 
        type: String
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Markaz", schema);