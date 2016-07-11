const express = require('express');
const path = require('path');
const browserify = require('browserify-middleware');
const app = express();
const API = 'da506aecce47e548b1877f8c6f9be793'

app.use(express.static(path.join(__dirname, "../client/public")));

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
  // POST http://localhost:1337/location 500 (Internal Server Error)
  console.log('should be location data',res.body)
  //  const URL = `http://api.brewerydb.com/v2/search/geo/point?radius=100&lat=${req.body.latitude}&lng=${req.body.longitude}&key=${API}`;
  //  console.log(req.body.latitude, req.body.longitude)
   //
  //  request(URL, function(error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //        res.send(JSON.parse(body));
  //     } else {
  //        console.log("/location error")
  //     }
  //  })
});

var port = process.env.PORT || 1337;
app.listen(port);
console.log("Listening on localhost:" + port);
