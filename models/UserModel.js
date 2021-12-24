const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["superadmin", "admin", "parents", "moderator", "teacher", "pupil"],
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
      default: false,
    },
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Markaz",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
