const mongoose = require("mongoose");

const schema = mongoose.Schema({
    group_id: {
        type: mongoose.Schema.ObjectId,
        ref: "GroupsModel",
        required: true,
        index: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "UserModel",
        required: true,
        index: true
    }

},
    { timestamps: true }
);

module.exports = mongoose.model("Pupil", schema);