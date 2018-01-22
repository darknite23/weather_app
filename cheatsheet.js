//Scope of tutorial 
/*
 MAKE a api call to a OpenWeatherMap.org API and then display the results
    to the console. 
    a. will need to signup for a for an account on OpenWeatherMap. 
        *. siging up for an account is usually how a site will give you access to there api. 
    b. will also need Node.js.       

  2. Step2. Setting up the project
    1.Create an empty directory named "weather-app" and run:
        - $ npm init
        a. this wil ask you to fill out additional info about your project.
            And will also produce your Package.json file. (Package.json file
            is just metadata about your project.)
    2. Create a file named server.js this file will house the code for your application
            a. Meaning it will have this like you GET/POST requst and listening port aka
                an important part of the app. 
*** once you have all of these item you can now start building your app. 
*/

//Making the API call
    //To make an api call we can use the popular npm module called "request"
        //request simplifies the process of making an http request in node. 
        /*
                $ npm install request --save
        */

    //Request is easy to use just pass in the target url, and request returns a callback function. 

    const request = require('request'); 

    request(url, function(err, response, body){
        if(err){
            console.log('error:', error);
        } else {
            console.log("body:" body);
        }
     })
     /*
      break down code on line 30 - 38:
      1. We require the request package: const request = require('request');  
      2. We pass in a url, and request returns a callback 
      function with three arguments: err, response, and body. 
      :request(url, function(err, response, body){});
      3.We check for an error in our request. If there is one, we log the error and are done.
      4.If there is no error, we log the entire contents of the response body.
     */

    //WHATS THE URL
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    var apiKey = '************************';
    var city = "glendale";
        //we are making the request to the json url. 



//CLEANING UP OUR RESPONSE
     //the data recieved as is looks like a mess of munbo jumbo! 
    //THis is when we want to convert the JSON to an Javascript Object.
     var weather = JSON.parse(body);