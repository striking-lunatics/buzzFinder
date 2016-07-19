import React from 'react';
import $ from 'jquery'

export default class Login extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: ''
      };
   }

   // setCallback() {

   //  this.props.getUserBreweries
   // }

   // Make this ajax call when users click on login button
   _logIn(attrs, callback) {
      $.ajax({
         url: '/login',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(attrs),
         dataType: 'json',
         success: function(data) {
            alert('You have logged in!')
          
           callback(data);
        
      

         },
         error: function(err) {
            alert('Username or password incorrect! Login failed!')
            // console.log('error:', err);
         }
      });
   }
   render() {
      console.log("inside render in login:", this.props.getUserBreweries);
      return (
         <div>

            <form>
               <input className='input-large form-control' value={this.state.username} placeholder="Username..." onChange={(e) => this.setState({username: e.target.value})}/>
               <input className='input-large form-control' type="password" value={this.state.password} placeholder='Password...' onChange={(e) => this.setState({password: e.target.value})}/> 

               <button onClick={(e) => this._logIn({username: this.state.username, password: this.state.password}, this.props.getUserBreweries)} type='button' className='btn btn-primary'>Submit</button>
            </form>
         </div>
      );
   }
}
