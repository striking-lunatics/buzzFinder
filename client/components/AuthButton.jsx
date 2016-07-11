import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import AuthPanel from './AuthPanel.jsx';

export default class AuthButton extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         show: false
      };
   }

   render() {

      let close = () => this.setState({show: false});

      return (
         <div className="modal-container col-sm-4">
            {/* Login/ Join button on main page */}
            <Button type='button' className='btn btn-primary btn-lg' onClick={() => this.setState({show: true})}>
               Login / Join
            </Button>
            <Modal show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">
               {/* Login panel */}
               <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">Login</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <AuthPanel/>
                  <SignUp closeLoginPanel= {() => this.setState({ show: false})}/>
               </Modal.Body>
               <Modal.Footer>
                  <Button type='button' className='btn btn-primary' onClick={close}>Close</Button>
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
                     Don't have an account?
                  </h5>
                  <Button type='button' className='btn btn-primary' onClick={() => {
                     {/*TO FIX: want to close login panel when signup form shows up*/
                     }
                     {/*this.props.closeLoginPanel();*/
                     }
                     this.setState({show: true});
                  }}>
                     Sign Up!
                  </Button>
               </div>
            </div>
            <Modal show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">
               {/* Signup panel */}
               <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">Sign Up</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <AuthPanel/>
               </Modal.Body>
               <Modal.Footer>
                  <Button type='button' className='btn btn-primary' onClick={close}>Close</Button>
               </Modal.Footer>
            </Modal>
         </div>
      );
   }
}
