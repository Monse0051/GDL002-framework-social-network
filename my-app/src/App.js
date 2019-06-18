import React from 'react';
import firebase from 'firebase';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import './Components/LoginPage.css';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import SignUpPage from './Components/SignUpPage';
import * as ROUTES from './Constants/routes';

class App extends React.Component {

  componentDidMount(){
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCmt7a6vfZ7MhNJyhcnxhjrhPbSQ_M68Wc",
      authDomain: "react-social-network-85607.firebaseapp.com",
      databaseURL: "https://react-social-network-85607.firebaseio.com",
      projectId: "react-social-network-85607",
      storageBucket: "react-social-network-85607.appspot.com",
      messagingSenderId: "351547157737",
      appId: "1:351547157737:web:cfd6714f5ee45501"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render(){
    return (
      <div className="container">
        <HashRouter>
          <div>
            <Route exact path="/" component={LoginPage}></Route>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}></Route>
            <Route path= '/home' component={HomePage}></Route>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
