import { NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';
import logo from './imgs/logo.png'
import "./styles.css";
import { useSelector } from 'react-redux';
import { useLogoutUserMutation } from './store/authApi';
import { useNavigate } from 'react-router-dom';


function Nav({ isLoggedIn }) {
    const cartProducts = useSelector( state => state.cart );

    const navigate = useNavigate();
    const [logout] = useLogoutUserMutation();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    }

    useEffect(() => {
        if (isLoggedIn === null) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <nav>
            <img src={logo} className='nav--logo' />
            {isLoggedIn &&  
                <div className='Nav'>
                    <NavLink to="/items">Home</NavLink>
                </div>
            }
            {isLoggedIn && 
                <div className='Nav'>
                    <NavLink to="items/new">Sell</NavLink>
                </div>
            }
            {!isLoggedIn && 
                <div className='Nav'>
                    <NavLink to={"login"}>Sign In</NavLink>
                </div>
            }
            {isLoggedIn && 
                <div className='Nav'>
                    <NavLink onClick={handleLogout}>Logout</NavLink>
                </div>
            }
            {isLoggedIn && 
                <div className='Nav-Right'>
                    <NavLink to={"cart"}>Cart {cartProducts.length}</NavLink>
                </div>
            }
        </nav>
    );
}

export default Nav;