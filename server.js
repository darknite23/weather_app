var express = require('express');
var bodyParser = require('body-parser');
//bp allows us to make use of the key-value pairs stored on the 
//req-body object. ?
var request = require('request'); //used for making http request


var app = express();// lets us use the express framework
var apikey = "d78c22d01128af7f05e3b4030d71375a";
var country = "us";
//var weatherpic = "src='http://openweathermap.org/img/w/10d.png'";


//*** use set up static public folder access 
app.use(express.static('public'));//express use the static folder public
app.use(bodyParser.urlencoded({extended: true})); //why do we use this????


//*** setting the view engine to ejs
app.set("view engine", "ejs"); //will use the view engine "ejs"



app.get('/',function(req,res){//"/" root url home
    //use get request to grab the home page for my index ejs file  
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
    //console.log(zip.zipcode);
    console.log(zip + "im post")
    var url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.zipcode},${country}&units=imperial&appid=${apikey}`; 
    //var url for pic? will need a var that will be assigned the icon id ${iconid}
  request(url,function(err,respone,body){
      if(err){ //on a post request if there is an err respond with a error message
                //to the index.ejs page with weather var being null, and erro message "try again"
          res.render('index', {weather: null, err: 'Error, please try again'});
      } else {//else create a jsObj under the name weather(is the json we recieved).
          var weather = JSON.parse(body);//used to create a jSobj we can now use dot notation.
          //console.log(weather);
          if(weather.main == undefined){ //if the json obj .main equals undefined respond with a 
            //rendering to the index.ejs file with null in all the variable but for error have an 
            //error message of, Error, please try a valid zip code!
              res.render('index', {
                  weather: null, 
                  pic: null, 
                  ejsConditions: null,
                  ejstemperature: null,
                  ejsWindSpeed: null,
                  ejsHumidity: null,
                  err: "Error, please try a valid zip code!"}); 
          } else { //else we have a json object from the weather api
            
              var icon = weather.weather[0].icon; //the id provided by Openweather
              var weatherpic = `src=http://openweathermap.org/img/w/${icon}.png`; //the url to display the pic
              // need the icon 
              var grabConditions = weather.weather[0].description;
              var grabTemp = weather.main.temp;
              var grabWindSpeed = weather.wind.speed;
              var grabHumidity = weather.main.humidity;
              var weatherText = `${weather.name},${weather.sys.country}`;
    
              res.render('index', {
                  weather: weatherText, 
                  err: null, 
                  pic: weatherpic, 
                  ejsConditions: grabConditions,
                  ejstemperature: grabTemp,
                  ejsWindSpeed: grabWindSpeed,
                  ejsHumidity: grabHumidity  
                }); //clearer understanding of what this does. 
                    
          }
      }
  })
});

app.listen(process.env.PORT || 3000,function(){ //listen for the process enviorment port or the local
    //host. 
    console.log('Listen to port 3000..');
})