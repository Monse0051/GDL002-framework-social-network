import React from 'react';
import firebase from 'firebase';
import * as ROUTES from '../Constants/routes'
import {Link} from "react-router-dom";

class Navbar extends React.Component {

    onSignOut() {
        firebase.auth().signOut();
    }

    render() {
        return (
            <nav>
                <h2 className="logo-link">Women Who Code</h2>
                <ul className="nav-views">
                    <li><Link className="nav-views__link" to={ROUTES.HOME_PAGE}><i><ion-icon name="home"></ion-icon></i></Link> </li>
                    <li><Link className="nav-views__link" to={ROUTES.FRIENDS_PAGE}><i><ion-icon name="contacts"></ion-icon></i> </Link></li>
                    <li><Link className="nav-views__link" to={ROUTES.MY_ACCOUNT_PAGE}><i><ion-icon name="person"></ion-icon></i> </Link></li>
                    <li><Link className="nav-views__link" to="/" onClick={this.onSignOut}><i><ion-icon name="log-out"></ion-icon></i></Link></li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;