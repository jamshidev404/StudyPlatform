const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    day_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Days",
      required: true,
    },

    group_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
      required: true,
    },
    pupil_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Pupil",
      required: true,
    },
    baho: {
      type: Number,
      default: 0,
      //required: true,
    },
    davomat: {
      type: Boolean,
      //required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Monitoring", schema);
