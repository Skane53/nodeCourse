let express = require("express");
let app = express();

console.log("Hello World");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  res.send(res.json);
});

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
