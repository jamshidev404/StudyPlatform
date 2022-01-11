const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    group_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
      required: true,
    },
    days: {
      type: String,
      default: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Days", schema);
