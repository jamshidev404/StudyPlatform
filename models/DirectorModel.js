const mongoose = require('mongoose');

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
       // required: true
    },
    gender: {
        type: Number,
        enum: [ 1, 2 ],
        //required: true
    },
    phone: {
         type: Number,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    birthday: {
        type: String,
        // required: true
    },
    center_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Markaz",
        //required: true
    }
},
      { timestamps: true }
);

module.exports = mongoose.model("Director", schema);