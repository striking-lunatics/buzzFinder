import React from 'react';

export default class BeerItem extends React.Component {
   render() {
      return (
         <div className="list-group breweryList">
            <a className="list-group-item">
               {this.props.name}
               <span className="distance pull-right">{this.props.abv}}</span>
            </a>
         </div>
      );
   }
}
