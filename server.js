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
  }),
);

app.get("/create", (req, res) => {
  res.send("Hello World")
})

// Routes

app.use("/api/user", require("./routes/UserRouter"));
app.use("/api/upload", require("./routes/UploadRouter"));
app.use("/api/qabul", require("./routes/Acceptance"));
app.use("/api/exam", require("./routes/ExamRouter"));

const port = process.env.PORT || 7000;
//const DB_URI = process.env.DB_URI;
const mongoDB = "mongodb+srv://jamxon:11225598@cluster0.pucsq.mongodb.net/study?retryWrites=true&w=majority"

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
  //useCreateIndex: true
}).then(() => {
  console.log("Connect successful");
}).catch((err) => {
  console.log("no connection");
});

app.listen(port, () => {
  console.log("Server is running");
});