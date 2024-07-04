const http = require("http");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));

// Array of zodiac signs with day ranges
const zodiacSigns = [
  { sign: "_aq", start: 19, end: 49 },
  { sign: "_pi", start: 50, end: 79 },
  { sign: "_ar", start: 80, end: 110 },
  { sign: "_ta", start: 111, end: 140 },
  { sign: "_ge", start: 141, end: 171 },
  { sign: "_ca", start: 172, end: 203 },
  { sign: "_le", start: 204, end: 234 },
  { sign: "_vi", start: 235, end: 265 },
  { sign: "_li", start: 266, end: 295 },
  { sign: "_sc", start: 296, end: 326 },
  { sign: "_sa", start: 327, end: 355 },
  { sign: "_cap", start: 356, end: 18 }
];

app.post("/", (req, res) => {
  let { date } = req.body;
  let day_num = dayOfYear(date);
  let query;

  for (let zodiac of zodiacSigns) {
    if ((zodiac.start <= zodiac.end && day_num >= zodiac.start && day_num <= zodiac.end) ||
        (zodiac.start > zodiac.end && (day_num >= zodiac.start || day_num <= zodiac.end))) {
      query = "?sign=" + zodiac.sign;
      break;
    }
  }

  res.redirect("/sign" + query);
});

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/sign", (req, res) => {
  const { sign } = req.query;
  res.render("sign" + sign);
});

function dayOfYear(data) {
  const parts = data.split('.');
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[2]);

  const dateObj = new Date(year, month - 1, day);

  const startOfYear = new Date(year, 0, 1);

  const diffTime = Math.abs(dateObj - startOfYear);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

http.createServer(app).listen(3000);
console.log("started");
