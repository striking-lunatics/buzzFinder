import React from 'react';
import BreweryDetail from './BreweryDetail.jsx';
import {Button, Modal} from 'react-bootstrap';

export default class BreweryItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      show: false
    }
  }
   render() {
      
      let close = () => this.setState({show: false});

      return (
        <div className="list-group breweryList">         
            <a className="list-group-item" onClick={() => this.setState({show: true})}>
               {this.props.name}
               <span className="distance pull-right">{`${this.props.distance} miles`}</span>
            </a>
           <Modal className='breweryDetail' show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">
             {/* Detail panel */}
             <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">{this.props.name} </Modal.Title>
             </Modal.Header>
             <Modal.Body>              
              <img className='center-block img-circle' src={this.props.image|| 'http://www.frenchtoastsunday.com/wp-content/uploads/2015/02/beer-icon.png'} alt= {this.props.name} />              
                <br/>
                <span>Address: </span>
                {this.props.address || 'No address available'} 
                <br/>
                {this.props.description || 'No description'} 

             </Modal.Body>
             <Modal.Footer>
                <button type='button' className='btn btn-primary' onClick={close}>Close</button>
             </Modal.Footer>
          </Modal>
        </div>
      );
   }
}
