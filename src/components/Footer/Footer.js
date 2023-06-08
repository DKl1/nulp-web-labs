import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <footer className='footer'>
            <div className={"div-cont"}>
                <div className={"div-inner"}>
                    <p>Contacts:</p>
                    <p>+380980687453</p>
                </div>
                <div className={"div-inner"}>
                    <p>Location:</p>
                    <p>Lviv, Bandera Street 2a</p>
                </div>
            </div>

            <p>&copy; {new Date().getFullYear()} Quill</p>

        </footer>
    );
}

export default Footer;
