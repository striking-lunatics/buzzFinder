import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import AuthPanel from './AuthPanel.jsx';

 const AuthButton = React.createClass({
  getInitialState() {
    return { show: false };
  },

  render() {
    let close = () => this.setState({ show: false});

    return (
      <div className="modal-container col-sm-4">
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.setState({ show: true})}
        >
         Login / Join
        </Button>

        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <AuthPanel />
           
           <SignUp />
          </Modal.Body>

          <Modal.Footer>
            <Button type='button' className='btn btn-primary' onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

  const SignUp = React.createClass({
  getInitialState() {
    return { show: false };
  },

  render() {
    let close = () => this.setState({ show: false});

    return (
      <div className="modal-container signUpForm">
        <div className='row'>
          <div className='col-sm-12'>
            <h5> Don't have an account? </h5>
            <Button 
              type='button' 
              className='btn btn-primary'
              onClick={() => this.setState({ show: true})}
            >
             Sign Up!
            </Button>
          </div>
        </div> 

        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <AuthPanel />
          </Modal.Body>
          <Modal.Footer>
            <Button type='button' className='btn btn-primary' onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
export default AuthButton;
