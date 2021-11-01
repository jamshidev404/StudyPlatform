const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enam: [
                "superadmin", "admin",
                "moderator", "user"],
            default: "user"
        },
        login: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        payment: {
            
        }

    },
    { timestamps: true } //
);

module.exports = mongoose.model('User', schema);