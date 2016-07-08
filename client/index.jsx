import React from 'react';
import ReactDOM from 'react-dom';
import RecipeWindow from './components/RecipeWindow.jsx';
//import {Button,Modal,Popover,} from 'react-bootstrap';
import {Button, Modal} from "react-bootstrap";

    const Trigger = React.createClass({
  getInitialState() {
    return { show: false };
  },

  render() {
    let close = () => this.setState({ show: false});

    return (
      <div className="modal-container" style={{height: 200}}>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.setState({ show: true})}
        >
          Launch contained modal
        </Button>

        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }
    render() {
        return (
            <div className="container App">
                <div className="row">
                    here is our state: {this.state.term}

                    <div className="col-sm-offset-2 col-sm-8">
                        {/*{ Create search box and add two-way bindings }*/}
                        <input value={this.state.term} onKeyPress={(e) => this.test(e)} onChange={(e) => this.setState({term: e.target.value})} type='text' className='form-control' placeholder='Search your recipes...'/>

                        <RecipeWindow/>
                        <Trigger/>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root'));
