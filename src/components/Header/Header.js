import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../header_logo.png';
import './Header.css'
import AuthContext from "../../context/AuthContext";

const Header = (props) => {
    let {user} = useContext(AuthContext)

    return (
        <header>
            <nav>
                <ul className="ul-header">
                    <li><Link to="/"><img className="img-header" src={logo} alt="main-icon"/></Link></li>
                    {user ? (
                        <>
                            <li><Link to="/books">Books</Link></li>
                            <li><Link to="/orders">Orders</Link></li>
                            <li><Link to="/authors">Authors</Link></li>
                            {user.role === 1 ? <li><Link to="/users">Users</Link></li> : null}
                            <li><Link to="/profile">Profile</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/sign-in">Sign in</Link></li>
                            <li><Link to="/sign-up">Sign up</Link></li>
                        </>
                    )}

                </ul>
            </nav>
        </header>
    );
}

export default Header;


