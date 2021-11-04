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
            enum: [
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
        status: {
            type: String,
            enum: ["true", "false"],
            default: "false"
        },
        phone: {
            type: Number,
        },
        group: {
            type: String
        },
        eduType: {
            type: String,
            enum: ["online", "offline"],
            default: "offline"
        },
        science: {
            type: String
        }

    },
    { timestamps: true } //
);

module.exports = mongoose.model('User', schema);