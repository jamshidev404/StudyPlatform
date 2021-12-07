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
         type: String,
         required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    inn: {
        type: Number,
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
    status: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "admin"
    },
    paybefore: {
        type: Number
    }

},
    { timestaps: true }
);

module.exports = mongoose.model("Center", schema);