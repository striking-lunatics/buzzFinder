const express = require('express');
const path = require('path');
const browserify = require('browserify-middleware');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const API = 'da506aecce47e548b1877f8c6f9be793';
const LOCATION = {
   lat: null,
   long: null
};
//  Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
   var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2 - lat1); // deg2rad below
   var dLon = deg2rad(lon2 - lon1);
   var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   var d = R * c; // Distance in km
   return d;
}

function deg2rad(deg) {
   return deg * (Math.PI / 180)
}

app.use(express.static(path.join(__dirname, "../client/public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.get('/app-bundle.js',
   browserify('./client/main.js', {
      transform: [
         [require('babelify'), {
            presets: ["es2015", "react"]
         }]
      ]
   })
);

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
   // Set permissive CORS header - this allows this server to be used only as
   // an API server in conjunction with something like webpack-dev-server.
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Disable caching so we'll always get the latest comments.
   res.setHeader('Cache-Control', 'no-cache');
   next();
});

app.post('/location', function(req, res) {

   console.log(req.body.latitude, req.body.longitude)
      // Get location results with social account information included.
      // withSocialAccounts=Y
      // Radius from point. Defaults to 10 miles.
      // radius=30

   const URL = `http://api.brewerydb.com/v2/search/geo/point?withSocialAccounts=Y&radius=30&lat=${req.body.latitude}&lng=${req.body.longitude}&key=${API}`;

   request(URL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
         console.log('/location: Sending Data')
         res.send(JSON.parse(body));
      } else {
         console.log("error: ", error)
      }
   })
});

app.post('/brewery/beer', function(req, res) {

   const breweryID = req.body.breweryId

   console.log("1: ", breweryID)

   const URL = `http://api.brewerydb.com/v2/brewery/${breweryID}/beers?key=${API}`;

   request(URL, function(error, response, body) {
      console.log("2: ", body)
      if (!error && response.statusCode == 200) {

         console.log('/brewery/beer: Sending Data')
         res.send(JSON.parse(body));
      } else {
         console.log("error: ", error)
      }
   })
});

app.post('/beer/brewery', function(req, res) {

   const beerID = req.body.beerId

   console.log("1: ", beerID)

   const URL = `http://api.brewerydb.com/v2/beer/${beerID}/breweries?key=${API}`;

   request(URL, function(error, response, body) {
      console.log("2: ", body)
      if (!error && response.statusCode == 200) {

         console.log('/beer/brewery: Sending Data')
         res.send(JSON.parse(body));
      } else {
         console.log("error: ", error)
      }
   })
});

// get location on run
fetchLocation();
function fetchLocation() {
   // fetchLocation
   request('http://ip-api.com/json', function(error, response, body) {
      if (!error && response.statusCode == 200) {
         const IP = JSON.parse(body);
         LOCATION.lat = IP.lat;
         LOCATION.long = IP.lon;
      }
   })
}

// find brewerys based on city, state
app.post('/city', function(req, res) {
  console.log(LOCATION.lat,LOCATION.long)

   var cityState = req.body.cityState.split(',');
   var city = cityState[0];
   var state = cityState[1];
   var lat = null;
   var long = null;

   var geoURL = `http://maps.google.com/maps/api/geocode/json?address=+${city},+${state}&sensor=false`;
   request(geoURL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = JSON.parse(body);
         if (data.results[0]) {
            lat = data.results[0].geometry.location.lat;
            long = data.results[0].geometry.location.lng;
         }
      } else {
         console.log("error: ", error)
      }
   })

   const URL = ` http://api.brewerydb.com/v2/locations?&locality=${city}&region=${state}&key=${API}`;
   request(URL, function(error, response, body) {
      fetchLocation();
      if (!error && response.statusCode == 200) {

         console.log('/city: Sending Data');

         // this api call does not return distance
         // use helper function to calc and insert into object then send to client
         var distanceKm = getDistanceFromLatLonInKm(LOCATION.lat, LOCATION.long, lat, long);
         var distanceMiles = Math.round(0.62137 * distanceKm);
         // add distance data to all brewerys
         var body = JSON.parse(body);
         if (body.data) {
            //console.log(body.data)
            console.log('distance Miles: ', distanceMiles);
            body.data.forEach(brewery => brewery.distance = distanceMiles);
            res.send(body);
         } else {
            console.log('/city: Error');
         }
      } else {
         console.log("error: ", error)
      }
   })
});

var port = process.env.PORT || 1337;
app.listen(port);
console.log("Listening on localhost:" + port);
