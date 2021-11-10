const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
// const mongoose = require("mongoose");
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

// Routes
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/create", require("./routes/UserRouter"));
app.use("/api/upload", require("./routes/UploadRouter"));
// app.use("/api/", require("./routes"));
// app.use("/api/", require("./routes"));

const port = process.env.PORT || 7000;
const DB_URI = process.env.DB_URI;

// App & MongoDB Connections
// mongoose.connect(DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   //useFindAndModify: false,
//   //useCreateIndex: true
// });
app.listen(port, () => {
  console.log("Server and DB running");
});
