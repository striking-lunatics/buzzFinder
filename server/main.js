const express = require('express');
const path = require('path');
const browserify = require('browserify-middleware');
var db  = require('./db');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const API = 'da506aecce47e548b1877f8c6f9be793';

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

   console.log("runnnning")
      //console.log("data:", req.body)
   console.log(req.body.latitude, req.body.longitude)

   const URL = `http://api.brewerydb.com/v2/search/geo/point?radius=100&lat=${req.body.latitude}&lng=${req.body.longitude}&key=${API}`;

   request(URL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
         console.log('Server: Sending Data')
         res.send(JSON.parse(body));
      } else {
         console.log("error: ", error)
      }
   })
});

app.post('/brewery/beer', function (req, res) {

   const breweryID = req.body.breweryId

   console.log("1: ", breweryID)

   const URL = `http://api.brewerydb.com/v2/brewery/${breweryID}/beers?key=${API}`;

   request(URL, function(error, response, body) {
      console.log("2: ", body)
      if (!error && response.statusCode == 200) {
      

         console.log('Server: Sending Data')
         res.send(JSON.parse(body));
      } else {
         console.log("error: ", error)
      }
   })
});

app.post('/beer/brewery', function (req, res) {

   const beerID = req.body.beerId

   console.log("1: ", beerID)

   const URL = `http://api.brewerydb.com/v2/beer/${beerID}/breweries?key=${API}`;

   request(URL, function(error, response, body) {
      console.log("2: ", body)
      if (!error && response.statusCode == 200) {
      

         console.log('Server: Sending Data')
         res.send(JSON.parse(body));
      } else {
         console.log("error: ", error)
      }
   })
});

var port = process.env.PORT || 1337;
app.listen(port);
console.log("Listening on localhost:" + port);
