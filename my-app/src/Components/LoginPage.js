import React from 'react';
import firebase from 'firebase';
import * as ROUTES from '../Constants/routes';
import {Link} from "react-router-dom";

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.firebase = firebase;

        this.state = {...INITIAL_STATE};
    }


    onSubmit = event => {
        const { email, password } = this.state;
        
        this.firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME_PAGE);
            console.log("DEBUG_MSG: authenticated!");
          })
          .catch(error => {
            this.setState({ error });
            console.log("DEBUG_MSG: error to auth");
            console.log(error);
          });
    
        event.preventDefault();
      };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render(){
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';
    
      return (
        <div className="login-page">
          <div className="login-section">
            <form onSubmit={this.onSubmit} >
              <input className = "input-email"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />  
              <input className = "input-password"
                name="password" 
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              /> 
              <button className = "signin-button" disabled={isInvalid} type="submit">
                Sign In
            </button>

              {error && <p>{error.message}</p>}
            </form>
          </div>
          <div className="signup-section">
              <p>Don't you have an account?</p> 
              <Link className="singup-button" to={ROUTES.SIGN_UP}>Sign up</Link>
          </div>
        </div>
      );
    }
}

export default LoginPage;