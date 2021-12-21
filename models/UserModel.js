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
      message: "Boshqa login kiriting",
    },
    password: {
      type: String,
      required: true,
    },
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Markaz",
    },
  },
  { timestamps: true }
);
schema.pre("remove", async function (next) {
  await this.model("User").deleteMany({ user: this._id });
  next();
});

module.exports = mongoose.model("User", schema);
