import React from 'react';
import * as ROUTES from '../Constants/routes'
import {Link} from "react-router-dom";

const Navbar = () => (
    <nav>
        <h2 className= "logo-link">Women in Code</h2>
        <ul className= "nav-views">
        <li><Link className= "nav-views__link" to= {ROUTES.HOME_PAGE}>Home </Link> </li>
        <li><Link className= "nav-views__link" to= {ROUTES.FRIENDS_PAGE}>Friends </Link></li>
        <li><Link className= "nav-views__link" to= {ROUTES.MY_ACCOUNT_PAGE}>My account </Link></li>
        <li><Link className="logout-button" to="/">Log Out</Link></li>
        </ul>
        
    </nav>

);

export default Navbar;