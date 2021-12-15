const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    gender: {
      type: Number,
      enum: [1, 2],
      required: true,
    },
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Markaz",
      required: true,
    },
  },
  { timestamps: true }
);

schema.pre("remove", async function (next) {
  await this.model("User").deleteMany({ user: this._id });
  next();
});

module.exports = mongoose.model("Moderator", schema);
