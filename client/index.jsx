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
            term: '',
            breweryList: []
        }

    }




    _getLocation() {
            if ('geolocation' in navigator) {
                this._requestLocation();
            } else {
                console.log("Browser doesn't support geolocation");
            }
        }

    _requestLocation() {

        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(this._success.bind(this), error, options);
        const error = (err) => console.log('error ', err);
    }


    _success(pos) {
        console.log("showing position on success:", pos);
        // this.setState({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
        // $.ajax({
        //     url: '/location',
        //     type: 'POST',
        //     contentType: 'application/json',
        //     data: JSON.stringify({
        //         latitude: this.state.latitude,
        //         longitude: this.state.longitude
        //     }),
        //     dataType: 'json',
        //     success: this._fetchBrewerysByLocation.bind(this)
        // });
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
                        <button onClick={() => this._getLocation()}>Use current location</button>
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
