let express = require("express");
let app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use("", (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  const d = new Date();
  const dateUTC = d.toUTCString();
  const datems = d.getTime();
  return res.send({ unix: datems, utc: dateUTC });
});

/* app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);
 */
app.get("/api/:date", (req, res) => {
  const pattern1 = /^\d{4}-\d{2}-\d{2}$/;
  const pattern2 = /^-?\d+$/;
  const { date } = req.params;
  if (pattern1.test(date)) {
    console.log("en string");
    //const [a, b, c] = date.split("-");
    const d = new Date(date);
    const dateUTC = d.toUTCString();
    const datems = d.getTime();
    if (dateUTC == "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    return res.json({ unix: datems, utc: dateUTC });
  }

  if (pattern2.test(date)) {
    console.log("en ms");
    const d = new Date(Number(date));
    const dateUTC = d.toUTCString();
    const datems = d.getTime();
    return res.json({ unix: datems, utc: dateUTC });
  }
  try {
    const d = new Date(date);
    const dateUTC = d.toUTCString();
    const datems = d.getTime();
    return res.json({ unix: datems, utc: dateUTC });
  } catch (error) {
    console.log(error);
  }
  res.json({ error: "Invalid Date" });
});

/* app.get("/name", (req, res) => {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});

app.post("/name", (req, res) => {
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
}); */

module.exports = app;
