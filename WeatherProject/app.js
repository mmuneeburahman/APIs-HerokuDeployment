const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
  console.log(req.body.cityName);
  console.log("Post request Recieved");
  const query = req.body.cityName;
  const apiKey = ":) Missing";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description; 
      const iconName = weatherData.weather[0].icon;
      var iconURL = "http://openweathermap.org/img/wn/"+iconName+"@2x.png";
      console.log(temperature);
      console.log(weatherDescription);
      // var output = "<h1/>The weather is currently "+weatherDescription+", and the temperature in Jhang is "+temperature+" degrees fernites.</h1>";
      // res.send(output);
      res.write("<h1/>The weather is currently "+weatherDescription+".</h1>");
      res.write("<h1>The temperature in " + query + " is " + temperature + " degrees Celcius.</h1>");
      res.write("<img src="+iconURL+">");
      res.send();
    });
})
  // res.write("Hello");
  // res.send();
  
})


app.listen(3000, function(){
  console.log("Server is runing on port 3000.")
})
