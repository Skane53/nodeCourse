let express = require("express");
let app = express();
require("dotenv").config();

console.log("Hello World");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.send({ message: "HELLO JSON" });
  } else {
    res.send({ message: "Hello json" });
  }
});

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
