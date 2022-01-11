const mongoose = require("mongoose");

const schema = mongoose.Schema({
  group_id: {
    type: mongoose.Schema.ObjecyId,
    ref: "Group",
    required: true,
  },
  days: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Days", schema);
