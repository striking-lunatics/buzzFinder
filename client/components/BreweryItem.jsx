import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import $ from 'jquery';

export default class BreweryItem extends React.Component {

   constructor(props) {
      super(props);
      this.handleOnClick = this.handleOnClick.bind(this);
   }

   // This function alerts the BreweryList(parent) component to set state
   handleOnClick(event) {
      event.preventDefault();
      $("body").addClass("modal-open");
      this.props.selectView(this.props.viewId);
      return false;
   }

   

   render() {

      return (
         <div className="list-group breweryList">
            <a className="list-group-item" onClick={this.handleOnClick}>
               {this.props.name}
               <span className="distance pull-right">{`${this.props.distance} miles`}</span>
               {(!this.props.likes)
                  ? null
                  : <span className="distance pull-right heart">&hearts; x {`${this.props.likes}`}</span>}
            </a>
         </div>
      );
   }
}
