const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve("views/index.html"));
});

// your first API endpoint...
app.get("/api/timestamp/:date?", (req, res) => {
  let param = req.params.date;
  let date;

  if (typeof param !== "undefined") {
    date = new Date(Number(param) || param);
  } else {
    date = new Date();
  }

  res.json(
    Boolean(date.valueOf())
      ? {
          date: date.toString(),
          unix: date.getTime(),
          utc: date.toUTCString()
        }
      : { error: "Invalid Date" }
  );
});

module.exports = app;
