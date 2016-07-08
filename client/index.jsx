import React from 'react';
import ReactDOM from 'react-dom';
import RecipeWindow from './components/RecipeWindow.jsx';
//import {Button,Modal,Popover,} from 'react-bootstrap';
// import {Button, Modal} from "react-bootstrap";
import AuthButton from './components/AuthButton.jsx'

 

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
                        <RecipeWindow/>
                    <AuthButton />
                    <div className="col-sm-offset-2 col-sm-8">
                        {/*{ Create search box and add two-way bindings }*/}
                        <input value={this.state.term} onKeyPress={(e) => this.test(e)} onChange={(e) => this.setState({term: e.target.value})} type='text' className='form-control' placeholder='Search your recipes...'/>
                       here is our state: {this.state.term}

                
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root'));
