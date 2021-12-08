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
    },
    contract: {
        type: String,
        required: true
    },
    contractdate: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Markaz", schema);