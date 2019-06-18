import React from 'react';
import firebase from 'firebase';
import * as ROUTES from '../Constants/routes';
import {Link} from "react-router-dom";

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <h1>Welcome to the Home Page</h1>
                <Link className="loginPage_link" to="/">Log Out</Link>
            </div>
        );
    }
} 
   
export default HomePage;