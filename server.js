const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { url } = require("inspector");

const app = express();

var place = "";
var temp = "";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("list", { location: place ,degree: temp});
})

app.post("/", function(req, res){
    place = req.body.city;
    
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=8e54a276957d6e671025ed40dc25f522&units=metric";
    
        https.get(url, function(response){
            
            response.on("data", function(data){
                const weatherdata = JSON.parse(data);
                temp = weatherdata.main.temp;

                res.redirect("/");
            })
        })
        
    })

app.listen(3000, function(){
    console.log("Server Started");
})