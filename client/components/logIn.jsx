
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
     _logIn(attrs) {
      $.ajax({
         url: '/login',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(attrs),
         dataType: 'json',
         success: function(data){
            alert('You have logged in!')
            console.log("saved user likes returned from login:", data);
         },
         error: function(err){
            alert('Username or password incorrect! Login failed!')
            console.log('error:', err);
         }
      });
   }
   render() {
      return (
         <div>

            <form>
               <input className='input-large form-control' value={this.state.username} placeholder="Username..." onChange={(e) => this.setState({username: e.target.value})}/>
               <input className='input-large form-control' type="password" value={this.state.password} placeholder='Password...' onChange={(e) => this.setState({password: e.target.value})}/> 
               {/*uN:{this.state.username}*/}
               {/*pW:{this.state.password}*/}

               <button onClick={(e) => this._logIn({username:this.state.username, password:this.state.password})} type='button' className='btn btn-primary'>Submit</button>
            </form>
         </div>
      );
   }
}
