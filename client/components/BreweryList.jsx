import React from 'react';
import BreweryItem from './BreweryItem.jsx';
//import App from './App.jsx';

export default class BreweryList extends React.Component {

   render() {
      return (
         <div>
            {this._createBreweryComponents()}
         </div>
      )
   }

   _createBreweryComponents() {
      console.log(this.props.brewerys)
      // return this.state.brewerys.filter((beer) => beer.streetAddress && beer.openToPublic == "Y" && beer.locationType != "office" && beer.brewery.images).map((beer, index) => {
      //    return <BreweryItem key={index} name={beer.brewery.name} address={beer.streetAddress} zipcode={beer.postalCode} distance={beer.distance} type={beer.locationType} icon={beer.brewery.images.icon}/>
      // });
   }
}
