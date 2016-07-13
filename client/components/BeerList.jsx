import React from 'react';
import BeerItem from './BreweryItem.jsx';

export default class BeerList extends React.Component {

   _createBeerComponents() {
      if (this.props.beers) {
         return this.props.beers.map((beer, index) => {
            return <BeerItem
              key={index}
              name={beer.name}
              id={beer.id}
              description={beer.description}
              abv={beer.abv}
              ibu={beer.ibu}
              style={beer.style.category.name}/>
         });
      }  else {
         return <h2>Loading...</h2>
      }
   }

   render() {
      return (
         <div className='beerList'>
            {this._createBeerComponents()}
         </div>
      );
   }
}
