import React from 'react';
import firebase from 'firebase';
import * as ROUTES from '../Constants/routes';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
  
  const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';
  
  const ERROR_MSG_ACCOUNT_EXISTS = `
    An account with this E-Mail address already exists.
    Try to login with this account instead. 
  `;

    class SignUpPage extends React.Component{
        constructor(props) {
          super(props);
          this.firebase = firebase;
          this.state = { ...INITIAL_STATE };
        }
      
        onSubmit = event => {
          const { email, passwordOne} = this.state;
          this.firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
            .then(() => {
              this.setState({ ...INITIAL_STATE });
              this.props.history.push(ROUTES.HOME_PAGE);
            })
            .catch(error => {
              if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
              }
      
              this.setState({ error });
            });
      
          event.preventDefault();
        };
      
        onChange = event => {
          this.setState({ [event.target.name]: event.target.value });
        };
      
        onChangeCheckbox = event => {
          this.setState({ [event.target.name]: event.target.checked });
        };
      
        render() {
          const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state;
      
          const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
      
          return (
            <div className="signup-page">   
            <form onSubmit={this.onSubmit}>
              <input className = "input-signup-username"
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              />
              <input className = "input-signup-email"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <input className = "input-signup-passwordOne"
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
              <input className = "input-signup-passwordtwo"
                name="passwordTwo" 
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
              <button className = "signup-form-button" disabled={isInvalid} type="submit">
                Sign Up
              </button>
      
              {error && <p>{error.message}</p>}
            </form>
            </div>
          );
        }
      }

export default SignUpPage;