const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    science_id: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Science",
        index: true,
        required: true,
      },
    ],
    group_id: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        index: true,
        //required: true
      },
    ],
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Markaz",
      index: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    gender: {
      type: Number,
      enum: [1, 2],
      required: true,
    },
    experience: {
      type: String,
      //required: true
    },
    phone: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", schema);
