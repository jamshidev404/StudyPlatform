const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
         type: String,
         required: true
    },
    inn: {
        type: Number,
        required: true
    },
    address: { 
        type: String,
        required: true
    },
    contract: {
        type: Number,
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