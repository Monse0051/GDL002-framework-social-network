import React from 'react';
import firebase from 'firebase';
import * as ROUTES from '../Constants/routes';
import Navbar from './Navbar';
import {Link} from "react-router-dom";

class  MyAccountPage extends React.Component {

    render() {
        return (
            <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <h1>Welcome to your Account</h1>
            </div>
            </div>
        );
    }
} 
   
export default MyAccountPage;