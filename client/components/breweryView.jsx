import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import BeerList from './BeerList.jsx';
import $ from 'jquery'

export default class BreweryView extends React.Component {

  _like(breweryId) {
      $.ajax({
         url: '/brewery/like',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({breweryId: breweryId}),
         dataType: 'json',
         success: function(data){
            console.log("brewery successfully liked:", data);
         },
         error: function(err){
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
                  <Modal.Title id="contained-modal-title"> <span className='title'> {this.props.company.brewery.name} </span>
                    <span className='address'>{!(this.props.company.streetAddress && this.props.company.locality && this.props.company.region)? null: `${this.props.company.streetAddress}, ${this.props.company.locality}, ${this.props.company.region}`}</span>
                  </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <a href={this.props.company.brewery.url} target='_blank'>
                     <img className='center-block img-circle'
                     	src={this.props.company.brewery.images? this.props.company.brewery.images.squareMedium : 'http://www.frenchtoastsunday.com/wp-content/uploads/2015/02/beer-icon.png'} alt={this.props.company.brewery.name}/>

                  </a>
                  <h4> Description </h4>
                  <div className='description'>
                    {this.props.company.brewery.description || 'No description'}
                  </div>
                  <BeerList company={this.props.company}/>
                  {/* <BeerList breweryID={this.props.id}/> */}

                  {/*<BeerList beers={self.state.beers}/>*/}

               </Modal.Body>
               <Modal.Footer>
                  <div className='btn-group' role='group'>
                     <button type='button' className='btn btn-primary' onClick={this.props.prevView}>
                        &larr; Prev
                     </button>
                     <button type='button' className='btn btn-primary heart' onClick={(e) => this._like(this.props.company.brewery.id)}>
                        &hearts;
                     </button>
                     {/*here is our state (test): {this.props.city}*/}
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
