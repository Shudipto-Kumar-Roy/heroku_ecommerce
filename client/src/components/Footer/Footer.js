import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <>
            <footer>
               <p>&copy; Copyright {(new Date).getFullYear()} Shudipto Kumar Roy | All rights reserved.</p>
            </footer>
        </>
    )
}

export default Footer;