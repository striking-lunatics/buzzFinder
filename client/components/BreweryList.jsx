import React from 'react';
import BreweryItem from './BreweryItem.jsx';
import $ from 'jquery';
const request = require('request');

export default class BreweryList extends React.Component {

   render() {
      return (
         <div className='breweryList'>
            {this._createBreweryComponents()}
         </div>
      )
   }

   _createBreweryComponents() {
      //  map brewerys data -> create BreweryItem for each brewery
      if (this.props.brewerys) {
         return this.props.brewerys.filter((beer) => beer.streetAddress && beer.openToPublic == "Y" && beer.locationType != "office" && beer.brewery.images).map((beer, index) => {
            return <BreweryItem
              key={index}
              breweryID={beer.id}
              url={beer.brewery.website}
              name={beer.brewery.name}
              description={beer.brewery.description}
              address={beer.streetAddress}
              zipcode={beer.postalCode}
              distance={beer.distance}
              type={beer.locationType}
              icon={beer.brewery.images.icon}
              image={beer.brewery.images.squareMedium}
              socialAccounts={beer.brewery.socialAccounts}/>
         });
      } else {
         return <h2>Loading Beers...</h2>
      }
   }
}
