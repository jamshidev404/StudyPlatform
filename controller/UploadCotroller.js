const uploadSchema = require("../models/UploadModel");
const fs = require("fs");
const path = require("path");

exports.uploads = async (req, res, next) => {
  const UpLoad = await uploadSchema.create({
    path: `../upload/${req.file.filename}`,
  });
  res.status(200).json({ success: true, data: UpLoad });
};

exports.del = async (req, res) => {
  await uploadSchema
    .findById({ _id: req.params.id })
    .exec(async (error, data) => {
      if (error) {
        throw error;
      } else {
        let filePath = path.join(__dirname, `${data.path}`);
        fs.unlink(filePath, async (error) => {
          if (error) {
            throw error;
          }
        });
        await uploadSchema.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "Deleted" });
      }
    });
};
