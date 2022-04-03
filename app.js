const express=require("express");
const { json } = require("express/lib/response");
const app=express();
const https=require("https");
//body parser is required for post request 
//install npm i body-parser 
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
 res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
  console.log(req.body.cityName);
    const city=req.body.cityName;
    const apikey="6a8d83a3f011d45cc04399872454a443";
    const unit='metric';
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);
   //this function is for parse the data into readable formatter
   //intially it is in hexadecimal  format

    response.on("data",function(data){
     const weatherData=JSON.parse(data);
     //console.log(weatherData);
     //path can copy from json awesome if complex josn
     const temp=weatherData.main.temp;
     console.log('current teperature of '+city+':'+temp+' C');
     const disc=weatherData.weather[0].description;
     console.log('weather type:'+disc);
     //for image take image url from weather icon
     const icon=weatherData.weather[0].icon;
     const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
     //send in website homepage 
     //send is only one so we use write and send
     res.write('<p>current weather is '+disc+' in '+city+'</p>');
     res.write('<h2>temperature of '+city+' '+temp+' degree celsius</h2>');
     res.write("<img src="+imgURL+">");
     res.send();
    });
  });
});
app.listen(process.env.PORT||2000,function(){
    console.log('server port 2000 is runnning ');
})