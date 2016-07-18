//import * as Auth from '../models/auth';
//import { Model } from 'react-bootstrap';
import React from 'react';
import $ from 'jquery'

export default class Signup extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: ''
      };
   }

     // Make this ajax call when users click on signup button 
     _signUp(attrs) { 
      console.log("signup submit clicked!");
      $.ajax({
         url: '/signup',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(attrs),
         dataType: 'json',
         success: function(){
            alert('Signup Success!')
            //console.log("get back signup response from server:");
         },
         error: function(err){
            if(err.status === 201) {
            // It hits this line whenever users successfully sign up 
               alert('Signup Success!')
               {document.location.reload()}
            } else {
               //console.log('error:', err);
            }          
         }
      });
   }
   render() {
      return (
         <div>

            <form>
               <input className='input-large form-control' value={this.state.username} placeholder="Username..." onChange={(e) => this.setState({username: e.target.value})}/>
               <input className='input-large form-control' value={this.state.password} placeholder='Password...' onChange={(e) => this.setState({password: e.target.value})}/> 
               <button onClick={(e) => this._signUp({username:this.state.username, password:this.state.password})} type='button' className='btn btn-primary'>Submit</button>
            </form>
         </div>
      );
   }
}
