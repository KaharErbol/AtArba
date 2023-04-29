import { NavLink } from 'react-router-dom';
import React from 'react';
import logo from './imgs/logo.png'

function Nav() {
    return (
        <nav>
            <img src={logo} className='nav--logo' /> 
            <div>
                <NavLink to="/">Home</NavLink> | <NavLink to="items/new">Sell</NavLink> | <NavLink to={"login"}>Sign In</NavLink>
            </div>
        </nav>
    );
}

export default Nav;