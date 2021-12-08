const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        message: "Password must be only string"
    },
    gender: {
        type: Number,
        enum: [ 1, 2 ],
        //required: true
    },
    phone: {
         type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        default: "admin"
    },
    birthday: {
        type: String,
        // required: true
    },
    center_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Center",
        //required: true
    }
},
    { timestaps: true }
);

module.exports = mongoose.model("Director", schema);

// "centername": "Teach Me",
// "login": "teachme",
// "password": "123",
// "director": "Ayitboyev Xushnud",
// "phone": "998911355686",
// "address": "Urganch viloyati Gastronom",
// "INN": 45521335,
// "email": "teachme@gmail.com",
// "contractdate": "25.12.2021",
// "contract": 1001,
// "paybefore": 300000