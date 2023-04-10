import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../header_logo.png';
import './Header.css'
const Header = (props) => {


    return (
        <header>
            <nav>
                <ul className="ul-header">
                    <li><Link to="/"><img className="img-header" src={logo} alt="main-icon" /></Link></li>
                    {props.check && <li><Link to="/books">Books</Link></li>}
                    {props.check && props.role===1 && <li><Link to="/orders">Orders</Link></li>}
                    {props.check && <li><Link to="/authors">Authors</Link></li>}
                    {props.check && props.role===1 && <li><Link to="/users">Users</Link></li>}
                    {props.check && <li><Link to="/profile">Profile</Link></li>}
                    {!props.check && <li><Link to="/sign-in">Sign in</Link></li>}
                    {!props.check && <li><Link to="/sign-up">Sign up</Link></li>}
                </ul>
            </nav>
        </header>
    );
}

export default Header;