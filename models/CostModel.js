const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    sum: {
      type: String,
      required: true,
    },
    bywhom: {
      type: String,
      required: true,
    },
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Markaz",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cost", schema);
