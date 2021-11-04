const router = require("express").Router();
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const Upload = require("../controller/UploadCotroller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

router.post('/add', upload.single("file"), Upload.uploads);
router.delete('/:id', Upload.del);

module.exports = router;
