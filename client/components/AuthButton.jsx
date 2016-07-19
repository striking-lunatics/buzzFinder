import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import Signup from './signUp.jsx';
import Login from './logIn.jsx';

export default class AuthButton extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         show: false
      };
      // this.getUserBreweries = this.props.getUserBreweries;
   }

   render() {

      let close = () => this.setState({show: false}); 
      console.log("inside authbutton", this.props.getUserBreweries)

      return (
         <div className="modal-container col-sm-4">
            {/* Login/ Join button on main page */}
            <button type='button' className='btn btn-primary btn-lg' onClick={() => this.setState({show: true})}>
               Login / Join
            </button>
            <Modal show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">
               {/* Login panel */}
               <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">Login</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Login getUserBreweries={this.props.getUserBreweries}/>
                  <SignUp closeLoginPanel= {() => this.setState({ show: false})}/>
               </Modal.Body>
               <Modal.Footer>
                  <button type='button' className='btn btn-primary' onClick={close}>Close</button>
               </Modal.Footer>
            </Modal>
         </div>
      );
   }
}

class SignUp extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         show: false
      };
   }
   render() {
      let close = () => this.setState({show: false});

      return (
         <div className="modal-container signUpForm">
            {/* Signup panel prompt*/}
            <div className='row'>
               <div className='col-sm-12'>
                  <h5>
                     Dont have an account?
                  </h5>
                  <button type='button' className='btn btn-primary' onClick={() => {
                     {/*Nice to have: want to close login panel when signup form shows up*/
                     }
                     this.setState({show: true});
                  }}>
                     Sign Up!
                  </button>
               </div>
            </div>
            <Modal show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">
               {/* Signup panel */}
               <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">Sign Up</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Signup/>
               </Modal.Body>
               <Modal.Footer>
                  <button type='button' className='btn btn-primary' onClick={close}>Close</button>
               </Modal.Footer>
            </Modal>
         </div>
      );
   }
}
