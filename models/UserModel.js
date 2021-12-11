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
        "pupil"
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
    eduType: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Markaz",
      //required: true
    },
    science: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
