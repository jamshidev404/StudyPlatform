const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    center: {
      name: {
        type: String,
        required: true,
      },
      inn: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      contract: {
        type: Number,
        required: true,
      },
      contractdate: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      paybefore: {
        type: String,
        required: true,
      },
    },
    director: {
      name: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      gender: {
        type: Number,
        enum: [1, 2],
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      birthday: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Markaz", schema);
