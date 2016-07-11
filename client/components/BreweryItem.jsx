import React from 'react';

export default class BreweryItem extends React.Component {

   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
        <div className='col-sm-8'>
          <h1>Buzz Finder!</h1>
          <h4>Only the best </h4>
        </div>
      );
   }
}
