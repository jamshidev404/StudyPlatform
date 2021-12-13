const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    ispaid: {
      type: Boolean,
      enum: ["true", "false"],
      default: "false",
      required: true,
    },
    paytype: {
      type: String,
      enum: ["Naqd", "Plastik"],
      default: "Naqd",
      required: true,
    },
    payamount: {
      type: Number,
      required: true,
    },
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Markaz",
      required: true,
    },
    group_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
      index: true,
      required: true,
    },
    pupil_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Pupil",
      index: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pay", schema);
