const mongoose = require('mongoose');

const schema = mongoose.Schema({
    centerName: {
        type: String,
        required: true
    },
    image: {
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
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
},
    { timestaps: true }
);

module.exports = mongoose.model("Center", schema);