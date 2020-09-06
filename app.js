const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

require("dotenv").config();

let mongo_uri = undefined;
if (process.env.ENVIRONMENT == "DEV") {
  mongo_uri = "mongodb://127.0.0.1:27017/codezap";
} else {
  mongo_uri = process.env.MONGODB_URI;
}

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected");

  app.use("/", (req, res, next) => {
    console.log(
      "inside troubleshooting middleware\n======================================================================"
    );
    console.log(req.method, " request at: ", req.path);
    console.log("request body:\n", req.body);
    console.log("request query values:\n", req.query);
    next();
  });

  app.use("/", require("./routes"));

  // error handler
  app.use((err, req, res, next) => {
    console.log(err);
    return res.status(400).send(err);
  });
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
