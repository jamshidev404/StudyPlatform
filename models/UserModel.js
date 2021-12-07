const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: [
        "superadmin",
        "admin",
        "parents",
        "moderator",
        "teacher",
        "user",
        "pupil",
      ],
      required: true,
    },
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    experience: {
      type: String,
    },
    eduType: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Center",
      required: true
    },
    science: {
      type: String,
    },
    group: {
      type: String,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
    },
    date: {
      type: String,
      //required: true
    },
    address: {
      type: String,
      //required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
