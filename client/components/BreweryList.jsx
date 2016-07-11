import React from 'react';
import BreweryItem from './BreweryItem.jsx';
import $ from 'jquery';
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
     const self = this;
      request('http://ip-api.com/json', function(error, response, body) {
         if (!error && response.statusCode == 200) {
            const IP = JSON.parse(body);

            console.log('BreweryList -> _fetchLocation', IP.lat, IP.lon);

            self._success(IP);

         }
      })
   }



   _success(IP) {
     const THIS = this;
     $.ajax({
        url: '/location',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({latitude: IP.lat, longitude: IP.lon}),
        dataType: 'json',
        success: (brewerys) => THIS.setState({brewerys: brewerys.data})
     });
   }

   _createBreweryComponents() {
      if (this.state.brewerys) {
         return this.state.brewerys.filter((beer) => beer.streetAddress && beer.openToPublic == "Y" && beer.locationType != "office" && beer.brewery.images).map((beer, index) => {
            return <BreweryItem key={index} url={beer.brewery.website} name={beer.brewery.name} address={beer.streetAddress} zipcode={beer.postalCode} distance={beer.distance} type={beer.locationType} icon={beer.brewery.images.icon}/>
         });
      } else {
         return <h2>Loading...</h2>
      }

   }
}
