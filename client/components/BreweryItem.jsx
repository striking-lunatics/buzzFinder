import React from 'react';

export default class BreweryItem extends React.Component {
   render() {
     if(click) {}
      return (
        <div className="list-group breweryList">
           <a className="list-group-item" href={this.props.url || '#'} target='_blank'>
              {this.props.name}
              <span className="distance pull-right">{`${this.props.distance} miles`}</span>
           </a>
        </div>
      );
   }
}
