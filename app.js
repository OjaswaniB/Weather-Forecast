const express=require("express");
const bodyParser=require("body-parser")
const https= require("https")

const app=express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine",'ejs')

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")

})

app.post("/", function(req,res){

    const key="f5c866614834aeca382809067bb5a3f9"
    const cityName = req.body.cityname;
    
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+key+"&units=metric";

    https.get(url,function(response){

        if(response.statusCode===404){
            res.status(404).send("wrong")
        }

        console.log(response.statusCode)

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const name= weatherData.name;
            const temp= weatherData.main.temp;
            const humid=weatherData.main.humidity;
            const press= weatherData.main.pressure;
            const wd=weatherData.wind.speed;
            const w= weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/" + icon +"@2x.png"
           
    res.render('response',{Temperature:temp, Desc:w, imgURL:imageUrl, Humidity:humid, wind:wd, Name:name, Pressure:press})

            
        })

    })

})

app.listen(8000, function(){
    console.log("The Server is Running on Port 3000");
})

