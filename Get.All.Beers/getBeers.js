// NOT USED DEMO
const request = require('request');
const API = 'da506aecce47e548b1877f8c6f9be793';
const fs = require('fs');
const BEER_DATA = [];
var numBrewerys = null;
var count = 0;

function writeToFile() {
   fs.writeFile("beers.json", JSON.stringify(BEER_DATA), function(err) {
      if (err) {
         console.log(err);
      }
      console.log("Get All-beerData saved!");
   });
}

fetchLocation()

function fetchLocation() {
   request('http://ip-api.com/json', function(error, response, body) {
      if (!error && response.statusCode == 200) {
         const IP = JSON.parse(body);
         console.log(IP.lat, IP.lon);
         fetchBrwerysLocation(IP.lat, IP.lon)
      }
   })
}

function fetchBrwerysLocation(lat, long) {
   const URL = `http://api.brewerydb.com/v2/search/geo/point?radius=25&lat=${lat}&lng=${long}&key=${API}`;
   request(URL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
         const brewerys = JSON.parse(body).data;
         const brewerysIDs = brewerys.map(brewery => brewery.id);
         numBrewerys = brewerysIDs.length;
         brewerysIDs.forEach(id => fetchBeers(id));
      }
   })
}

function fetchBeers(id) {
   const URL = `http://api.brewerydb.com/v2/brewery/${id}/beers?&key=${API}`;
   request(URL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
         const beers = JSON.parse(body).data;
         BEER_DATA.push(beers);

         count++;
         if (count === numBrewerys) {
            // inc count when more data is pushed to array
            // when count === numBrewerys call the fs write funciton
            writeToFile()
         }
      }
   })
}
