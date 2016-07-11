import React from 'react';
import BreweryItem from './BreweryItem.jsx';

export default class BreweryList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         brewerys: [],
         longitude: null,
         latitude: null
      };
   }

   componentWillMount() {
      this._getLocation();
   }

   render() {
      return (
         <div>
            <h1 className="text-center">Drink Local</h1>
            {this._createBreweryComponents()}
         </div>
      )
   }

   _getLocation() {
      if ('geolocation' in navigator) {
         this._requestLocation();
      } else {
         console.log("Browser doesn't support geolocation");
      }
   }

   _requestLocation() {

      const options = {
         enableHighAccuracy: false,
         timeout: 5000,
         maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(this._success.bind(this), error, options);
      const error = (err) => console.log('error ', err);
   }

   _success(pos) {
      this.setState({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
      $.ajax({
         url: '/location',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({latitude: this.state.latitude, longitude: this.state.longitude}),
         dataType: 'json',
         success: this._fetchBrewerysByLocation.bind(this)
      });
   }

   _fetchBrewerysByLocation(data) {
      this.setState({brewerys: data.data});
   }

   _createBreweryComponents() {
      //console.log(this.state.brewerys)
      return this.state.brewerys.filter((beer) => beer.streetAddress && beer.openToPublic == "Y" && beer.locationType != "office" && beer.brewery.images).map((beer, index) => {
         return <BreweryItem key={index} name={beer.brewery.name} address={beer.streetAddress} zipcode={beer.postalCode} distance={beer.distance} type={beer.locationType} icon={beer.brewery.images.icon}/>
      });
   }
}
