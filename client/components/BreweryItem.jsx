import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import $ from 'jquery';

export default class BreweryItem extends React.Component {

   constructor(props) {
      super(props);
      this.handleOnClick = this.handleOnClick.bind(this);
      // this.state = {
      //    show: false,
      //    beers: null
      // }
   }

   handleOnClick(event) {
      event.preventDefault();
       $("body").addClass("modal-open");
      this.props.selectView(this.props.viewId);
      return false;
   }

   // componentDidMount() {
   //    // call on load
   //    this._getBeers();
   // }

   _getBeers() {
      const self = this;
      $.ajax({
         url: '/brewery/beer',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({breweryId: this.props.breweryID}),
         dataType: 'json',
         success: beers => {
            if (beers.data) {
               self.setState({beers: beers.data});
               // console.log('Beer List', this.props.breweryID, beers.data);
            }
         }
      });
   }

   render() {
      // let close = () => {this.setState({show: false}); $("body").removeClass("modal-open")};
      // var self = this;
      console.log(this.props.likes);
      return (

         <div className="list-group breweryList">
            <a className="list-group-item" onClick={this.handleOnClick}>
               {this.props.name}
               <span className="distance pull-right">{`${this.props.distance} miles`}</span>
            </a>
         </div>
      );
   }
}
