import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return ( 
        <ul className="nav">
            <li><NavLink exact to="/" activeClassName="active">Burger Builder</NavLink></li>
            <li><NavLink exact to="/orders" activeClassName="active">Orders</NavLink></li>
        </ul>
     );
}
 
export default Nav;