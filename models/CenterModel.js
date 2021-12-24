const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    centername: {
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
    centerphone: {
      type: String,
    },
    centeremail: {
      type: String,
    },
    paybefore: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: [1, 2],
      required: true,
    },
    directorphone: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
// schema.pre("remove", async function (next) {
//   await this.model("User").deleteMany({ center_id: this._id });
//   next();
// });

module.exports = mongoose.model("Markaz", schema);
