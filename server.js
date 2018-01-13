var express = require('express');
var bodyParser = require('body-parser');
//bp allows us to make use of the key-value pairs stored on the 
//req-body object. 
var request = require('request'); //used for making http request
var heroku = "https://git.heroku.com/aqueous-reaches-57027.git";


var app = express();// lets us use the express framework
var apikey = "d78c22d01128af7f05e3b4030d71375a";
var country = "us";
//var weatherpic = "src='http://openweathermap.org/img/w/10d.png'";


//*** use set up static public folder access 
app.use(express.static('public'));//express use the static folder public
app.use(bodyParser.urlencoded({extended: true})); //why do we use this????


//*** setting the view engine to ejs
app.set("view engine", "ejs");



app.get('/',function(req,res){//"/" root url home
    //res.send('Hi again Ralph'); //instead of text we want to respond to someone visiting our app with html. 
    //res.render('index'); //will render the html file index inside of the view folder. 
    res.render('index', {
        weather: null, 
        pic: null,
        ejsConditions: null,
        ejstemperature: null,
        ejsWindSpeed: null,
        ejsHumidity: null,
        err: 'Error, please try again'
    });
});


//what the big diffence between them: post and get???

app.post('/',function(req,res){//with the bodyParser we can now use post request
    //to log the value of "zipcode" to the console. 
    var zip = req.body; 
    console.log(zip.zipcode);
    var url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.zipcode},${country}&units=imperial&appid=${apikey}`; 
    //var url for pic? will need a var that will be assigned the icon id ${iconid}
  request(url,function(err,respone,body){
      if(err){
          res.render('index', {weather: null, err: 'Error, please try again'});
      } else {
          var weather = JSON.parse(body);//used to create a jSobj we can now use dot notation.
           
          console.log(weather);
 //console.log(weather.weather[0].icon);
          if(weather.main == undefined){
              res.render('index', {
                  weather: null, 
                  pic: null, 
                  ejsConditions: null,
                  ejstemperature: null,
                  ejsWindSpeed: null,
                  ejsHumidity: null,
                  err: "Error, please try a valid zip code!"});
                    //an object wherre we can specify properties to be handled by index.ejs
                            //if res.render is broken rm weatherpic. 
          } else {
              /*
              console.log("Location: " +  info.name + " " + info.sys.country);
                console.log("Temperature: " + kelvinToFahrenheit(info.main.temp) + "F");
                console.log("Description: " + info.weather[0].description);
                console.log("Humidity: " + info.main.humidity);
              */
              var icon = weather.weather[0].icon;
              var weatherpic = `src=http://openweathermap.org/img/w/${icon}.png`;
              var grabConditions = weather.weather[0].description;
              var grabTemp = weather.main.temp;
              var grabWindSpeed = weather.wind.speed;
              var grabHumidity = weather.main.humidity;
              
              
              var weatherText = `${weather.name},${weather.sys.country}`;
               /* 
              var weatherText = `It's ${weather.main.temp} degrees in ${weather.name},${weather.sys.country}!
              Current condition: ${weather.weather[0].description} and humidity at ${weather.main.humidity}.
              Wind speeds: ${weather.wind.speed}. And the low/high today is ${weather.main.temp_min}/${weather.main.temp_max}`;
              */
              //console.log(x);
              res.render('index', {
                  weather: weatherText, 
                  err: null, 
                  pic: weatherpic, 
                  ejsConditions: grabConditions,
                  ejstemperature: grabTemp,
                  ejsWindSpeed: grabWindSpeed,
                  ejsHumidity: grabHumidity  
                }); //need to change somethings
                                                                    // on the index.ejs to see 
                                                                    // these variables in action
          }
      }
  })
});

app.listen(3000,function(){
    console.log('Listen to port 3000..');
})