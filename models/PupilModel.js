const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    group_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
      required: true,
      index: true,
    },
    number: {
      type: Number,
      //required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    isPayed: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Pupil", schema);
