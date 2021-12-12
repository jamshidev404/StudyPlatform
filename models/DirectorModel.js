const mongoose = require("mongoose");

const DirectorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: true
    },
    gender: {
      type: Number,
      enum: [1, 2],
      //required: true
    },
    phone: {
      type: Number,
      // required: true
    },
    address: {
      type: String,
      // required: true
    },
    birthday: {
      type: String,
      // required: true
    },
    center_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Markaz",
      //required: true
    },
  },
  { timestamps: true }
);

DirectorSchema.pre("remove", async function (next) {
  await this.model("User").deleteMany({ user: this._id });
  next();
});

module.exports = mongoose.model("Director", DirectorSchema);
