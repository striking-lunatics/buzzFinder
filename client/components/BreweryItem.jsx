import React from 'react';

export default class BreweryItem extends React.Component {

   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
        <div>
          <h1 className='text-center'>Buzz Finder!</h1>
          <h4 className='text-center'>Only the best</h4>
        </div>
      );
   }
}
