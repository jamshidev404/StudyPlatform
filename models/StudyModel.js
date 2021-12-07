const mongoose = require('mongoose');

const schema = mongoose.Schema({
    centername: {
        type: String,
        required: true
    },
    inn: {
        type: String,
        required: true
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
    },
    address: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Center", schema)