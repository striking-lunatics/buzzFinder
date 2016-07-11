import React from 'react';

export default class BreweryItem extends React.Component {

   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <div className='col-sm-8'>
            <h1>Local Craft Brews</h1>
            <h4>The Only Source for Craft Beer</h4>
         </div>
      );
   }
}
