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
      },
      email: {
        type: String,
      },
      paybefore: {
        type: Number,
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
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      birthday: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);
schema.pre("remove", async function (next) {
  await this.model("User").deleteMany({ user: this._id });
  next();
});

module.exports = mongoose.model("Markaz", schema);
