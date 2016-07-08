import React from 'react';
import ReactDOM from 'react-dom';
import BreweryItem from './components/BreweryItem.jsx';
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
                    <BreweryItem />
                    <AuthButton />
                    <div className="col-sm-offset-2 col-sm-8">
                        {/*{ Create search box and add two-way bindings }*/}
                        <form>
                        <input value={this.state.term} onKeyPress={(e) => this.test(e)} onChange={(e) => this.setState({term: e.target.value})} type='text' className='form-control' placeholder='Search by city.....'/>
                        <button onClick={(e) => e.preventDefault()}>Search</button>
                       here is our state: {this.state.term}
                        </form>
                        <button onClick={() => alert('use the current location deal')}>Use current location</button>
                    </div>
                </div>
            </div>
        );
    }
    test(e){
        if (e.key==='Enter') alert('they pressed enter we will search by provided city'); 
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root'));
