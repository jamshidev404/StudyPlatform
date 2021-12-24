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
  },
  { timestamps: true }
);
