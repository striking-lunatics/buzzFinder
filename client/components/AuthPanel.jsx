//import * as Auth from '../models/auth';
//import { Model } from 'react-bootstrap';
import React from 'react';

export default class AuthPanel extends React.Component {

   constructor(props) {
      super(props);
      this.state = {username:'', password:''};
   }

   render() {
      return (
        <div>
        <form>
          <input
          value={this.state.username}
          placeholder="Username..."
          onChange={(e) => this.setState({username:e.target.value})} 
           />
          <input
          value={this.state.password}
          placeholder='Password...'
          onChange={(e) => this.setState({password:e.target.value})}
           />
           uN:{this.state.username}
           pW:{this.state.password}

          <button>Submit</button>
          </form>
        </div>

      );
   }
}
