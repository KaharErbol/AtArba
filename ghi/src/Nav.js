import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <div>
                <NavLink to="/">Home</NavLink> | <NavLink to="items/new">List</NavLink>
            </div>
        </nav>
    );
}

export default Nav;