const express = require("express");
const https = require("https");
const bodyparser = require("body-parser")

const app = express();

app.use(bodyparser.urlencoded({extended: true}));


app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req, res){
const query = req.body.cityname
const apikey = "5384aafcc7e9a637b6164a80f360ad13"
const unit ="metric"

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=" + unit;
https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
       const weatherdata= JSON.parse(data)
       const temp = weatherdata.main.temp
       const weatherdescription = weatherdata.weather[0].description //from json file of api *main.temp *weather[0].description(because weather in array)
       const icon = weatherdata.weather[0].icon
       const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
       res.write("<p>The weather is currently " + weatherdescription + "<p>")
       res.write("<h1>The temperature in "+query+" is " + temp + "degrees celcius</h1>")
       res.write("<img src=" + imageurl + ">");
       res.send()
    //console.log(weatherdescription)  
    // res.send("server is running."); we can't use 2 send    
    });

});
    
});


app.listen(3000,function(){
    console.log("server started on port 3000")
})