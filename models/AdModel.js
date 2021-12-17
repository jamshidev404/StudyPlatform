const mongoose = require("mongoose");

const schema = mongoose.Schema({
  group_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Group",
    required: true,
  },
  science_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Science",
    required: true,
  },
  center_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Center",
    required: true,
  },
  teacher_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Teacher",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Elon", schema);
