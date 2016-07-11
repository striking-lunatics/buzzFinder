import React from 'react';
import BreweryItem from './BreweryItem.jsx';
//import App from './App.jsx';
const request = require('request');

export default class BreweryList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         brewerys: null
      }

   }
   componentDidMount() {
      this._fetchLocation();
   }

   render() {
      return (
         <div>
            {this._createBreweryComponents()}
         </div>
      )
   }

   _fetchLocation() {
      request('http://ip-api.com/json', function(error, response, body) {
         if (!error && response.statusCode == 200) {
            const IP = JSON.parse(body);
            console.log('BreweryList -> _fetchLocation', IP.lat, IP.lon);
            //this.setState({latitude: IP.lat, longitude: IP.lon});
            //this._fetchBrwerysLocation(IP.lat, IP.lon);
            const API = 'da506aecce47e548b1877f8c6f9be793';
            const URL = `http://api.brewerydb.com/v2/search/geo/point?radius=25&lat=${ IP.lat}&lng=${IP.lon}&key=${API}`;
            request(URL, function(error, response, body) {
              //Fetch API cannot load http://api.brewerydb.com/v2/search/geo/point?radius=25&lat=30.4998&lng=-97.8082&key=da506aecce47e548b1877f8c6f9be793.
              // No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:1337' is therefore not allowed access.
              //  If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
               if (!error && response.statusCode == 200) {
                  const brewerys = JSON.parse(body).data;
                  this.setState({brewerys: data});
                  console.log('_fetchBrwerysLocation', this.state.brewerys)
               }
            })
         }
      })
   }

  //  _fetchBrwerysLocation(lat, long) {
  //     const API = 'da506aecce47e548b1877f8c6f9be793';
  //     const URL = `http://api.brewerydb.com/v2/search/geo/point?radius=25&lat=${lat}&lng=${long}&key=${API}`;
  //     request(URL, function(error, response, body) {
  //        if (!error && response.statusCode == 200) {
  //           const brewerys = JSON.parse(body).data;
  //           this.setState({brewerys: data});
  //           console.log('_fetchBrwerysLocation', this.state.brewerys)
  //        }
  //     })
  //  }

   _createBreweryComponents() {
      if (this.state.brewerys) {
         return this.state.brewerys.filter((beer) => beer.streetAddress && beer.openToPublic == "Y" && beer.locationType != "office" && beer.brewery.images).map((beer, index) => {
            return <BreweryItem key={index} name={beer.brewery.name} address={beer.streetAddress} zipcode={beer.postalCode} distance={beer.distance} type={beer.locationType} icon={beer.brewery.images.icon}/>
         });
      } else {
         return <h2>Loading...</h2>
      }

   }
}
