import React from 'react';

export default class BreweryItem extends React.Component {

   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
        <div className="list-group breweryList">
           <a className="list-group-item" href="#">
              {this.props.name}
              <span className="distance pull-right">{`${this.props.distance} miles`}</span>
           </a>
        </div>
      );
   }
}
