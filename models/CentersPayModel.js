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
    date: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CenterPay", schema);
