const mongoose = require('mongoose');

const schema = mongoose.Schema({
    centername: {
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
    director: {
        type: String,
        required: true
    },
    phone: {
         type: Number,
         required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    INN: {
        type: Number,
        required: true
    },
    license: {
        type: String,
        required: true
    },
    givenlicensedate: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }

},
    { timestaps: true }
);

module.exports = mongoose.model("Center", schema);