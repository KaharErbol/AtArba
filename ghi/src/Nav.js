import { NavLink } from 'react-router-dom';
import React from 'react';
import logo from './imgs/logo.png'
import "./styles.css";
import { useSelector } from 'react-redux';

function Nav() {
    const cartProducts = useSelector( state => state.cart );
    return (
        <nav>
            <img src={logo} className='nav--logo' /> 
            <div className='Nav'>
                <NavLink to="/">Home</NavLink>
            </div>
            <div className='Nav'>
                <NavLink to="items/new">Sell</NavLink>
            </div>
            <div className='Nav'>
                <NavLink to={"login"}>Sign In</NavLink>
            </div>
            <div className='Nav-Right'>
                <NavLink to={"cart"}>Cart {cartProducts.length}</NavLink>
            </div>
        </nav>
    );
}

export default Nav;