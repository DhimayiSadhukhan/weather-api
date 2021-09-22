const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", function (req, res) {
  var city = req.body.city;
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=16bc15a9f744b92f1a0fdb93ce33ce17&units=metric";
  https.get(url, function (response) {
    response.on("data", function (d) {
      const info = JSON.parse(d);
      const desc = info.weather[0].description;
      const temp = info.main.temp;
      const pres = info.main.pressure;
      const humidity = info.main.humidity;
      res.write("<p>Weather description : " + desc + "</p>");
      res.write("<p>Temperature : " + temp + " degree Celcius</p>");
      res.write("<p>Pressure : " + pres + " mb</p>");
      res.write("<p>Humidity : " + humidity + " %</p>");
      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port 3000");
});
