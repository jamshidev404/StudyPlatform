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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
schema.pre("remove", async function (next) {
  await this.model("User").deleteMany({ center_id: this.center });
  await this.model("Qabulxona").deleteMany({ center_id: this.center });
  await this.model("Elon").deleteMany({ center_id: this.center });
  await this.model("CenterPay").deleteMany({ center_id: this.center });
  await this.model("Exam").deleteMany({ center_id: this.center });
  await this.model("Group").deleteMany({ center_id: this.center });
  await this.model("Moderator").deleteMany({ center_id: this.center });
  await this.model("Pay").deleteMany({ center_id: this.center });
  await this.model("Pupil").deleteMany({ center_id: this.center });
  await this.model("Science").deleteMany({ center_id: this.center });
  await this.model("Teacher").deleteMany({ center_id: this.center });
  next();
});

module.exports = mongoose.model("Markaz", schema);
