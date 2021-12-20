const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("morgan")("tiny"));
app.use(cors());
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// Routes
app.use("/api/user", require("./routes/UserRouter"));
app.use("/api/upload", require("./routes/UploadRouter"));
app.use("/api/qabul", require("./routes/Acceptance"));
app.use("/api/exam", require("./routes/ExamRouter"));
app.use("/api/group", require("./routes/GroupRouter"));
app.use("/api/pupil", require("./routes/PupilRouter"));
app.use("/api/teacher", require("./routes/TeacherRouter"));
app.use("/api/science", require("./routes/ScienceRouter"));
app.use("/api/pay", require("./routes/PayRouter"));
app.use("/api/center", require("./routes/CenterRouter"));
app.use("/api/superadmin", require("./routes/SuperAdmin"));
app.use("/api/centerpay", require("./routes/CentersPayRouter"));
app.use("/api/moderator", require("./routes/ModeratorRouter"));
app.use("/api/ad", require("./routes/AdRouter"));

// Connect to DataBase
const port = process.env.PORT || 7000;
const mongoDB =
  "mongodb+srv://jamxon:11225598@cluster0.pucsq.mongodb.net/study?retryWrites=true&w=majority";
//"mongodb://localhost:27017/study";
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
  })
  .then(() => {
    console.log("DB connect successfully");
  })
  .catch((err) => {
    console.log("no connection", err);
  });

app.listen(port, () => {
  console.log("Server is running");
});
