import React from 'react';
import firebase from 'firebase';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import './Components/Navbar.css';
import './Components/LoginPage.css';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import SignUpPage from './Components/SignUpPage';
import FriendsPage from './Components/FriendsPage';
import MyAccountPage from './Components/MyAccountPage';
import * as ROUTES from './Constants/routes';
import * as CONFIG from './Constants/config';

class App extends React.Component {

  componentDidMount(){
    // if firebase app not initialized, then initialize
    if (firebase.apps.length === 0) {
      firebase.initializeApp(CONFIG.firebaseConfig);
    }
  }

  render(){
    return (
      <div className="container">
        <HashRouter>     
          <div>
            <Route exact path="/" component={LoginPage}></Route>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}></Route>
            <Route path= {ROUTES.HOME_PAGE} component={HomePage}></Route>
            <Route path= {ROUTES.FRIENDS_PAGE} component={FriendsPage}></Route>
            <Route path= {ROUTES.MY_ACCOUNT_PAGE} component={MyAccountPage}></Route>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
