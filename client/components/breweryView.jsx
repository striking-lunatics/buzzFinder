import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import BeerList from './BeerList.jsx';
import $ from 'jquery'

export default class BreweryView extends React.Component {

    // Make this ajax call when users like a brewery 
   _like(breweryId) {
      $.ajax({
         url: '/brewery/like',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({breweryId: breweryId}),
         dataType: 'json',
         success: function(data) {
            console.log("brewery successfully liked:", data);
         },
         error: function(err) {
            console.log('error:', err);
         }
      });
   }

   render() {

      const show = (this.props.company !== undefined);
      var self = this;

      return (
         <div>
            <Modal className='breweryDetail' show={show} onHide={this.props.closeView} container={this} aria-labelledby="contained-modal-title">
               {/* Detail panel */}
               <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">
                     <span className='title'>
                        {this.props.company.brewery.name}
                     </span>
                     <span className='address'>{!(this.props.company.streetAddress && this.props.company.locality && this.props.company.region)
                           ? null
                           : `${this.props.company.streetAddress}, ${this.props.company.locality}, ${this.props.company.region}`}</span>
                  </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <a href={this.props.company.brewery.url} target='_blank'>
                     <img className='center-block img-circle' src={this.props.company.brewery.images
                        ? this.props.company.brewery.images.squareMedium
                        : 'http://www.frenchtoastsunday.com/wp-content/uploads/2015/02/beer-icon.png'} alt={this.props.company.brewery.name}/>

                  </a>
                  <h4>
                     Description
                  </h4>
                  <div className='description'>
                     {this.props.company.brewery.description || 'No description'}
                  </div>
                  <BeerList company={this.props.company}/>
               </Modal.Body>
               <Modal.Footer>
                  <div className='btn-group' role='group'>
                     <button type='button' className='btn btn-primary' onClick={this.props.prevView}>
                        &larr; Prev
                     </button>
                  {/* This like button is not fully functional: users can like it but cannot unlike it. Also need to disable the button after the users have liked it */}
                     <button type='button' className='btn btn-primary heart' onClick={(e) => this._like(this.props.company.brewery.id)}>
                        &hearts;
                     </button>
                     <button type='button' className='btn btn-primary' onClick={this.props.nextView}>
                        Next &rarr;
                     </button>
                  </div>
               </Modal.Footer>
            </Modal>
         </div>
      );
   }
}
