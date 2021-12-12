const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
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
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Science", schema);
