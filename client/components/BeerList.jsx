import React from 'react';
import BeerItem from './BreweryItem.jsx';
import $ from 'jquery';

export default class BeerList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         beers: null
      }
   }

   componentDidMount() {
      // call on load
      this._getBeers();
   }

   _getBeers() {
      const self = this;
      $.ajax({
         url: '/brewery/beer',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({breweryId: this.props.company.brewery.id}),
         dataType: 'json',
         success: beers => {
            if (beers.data) {
               self.setState({beers: beers.data});
               //console.log('Beer List', beers.data);
            }
         }
      });
   }

   _createBeerComponents() {
      //console.log("_createBeerComponents", this.state.beers)
      if (this.state.beers) {
         return this.state.beers.map((beer, index) => {
            return <BeerItem key={index} name={beer.name} id={beer.id} description={beer.description} abv={beer.abv} ibu={beer.ibu}/>
         });
      } else {
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
