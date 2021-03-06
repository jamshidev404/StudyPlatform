const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    starttime: {
      type: String,
    },
    endtime: {
      type: String,
    },
    days: {
      type: Array,
      required: true,
    },
    room: {
      type: Number,
      required: true,
    },
    edutype: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    status: {
      type: String,
      enum: ["arxiv", "active", "unactive"],
      default: "unactive",
    },
    price: {
      type: Number,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    monthlesson: {
      type: Number,
      required: true,
    },
    maxpupil: {
      type: Number,
      required: true,
    },
    teacher_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
      index: true,
      required: true,
    },
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Markaz",
      required: true,
    },
    science_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Science",
      index: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", schema);
