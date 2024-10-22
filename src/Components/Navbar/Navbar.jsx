import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to='/'><img src={logo} alt="S Plus Studios Logo" /></Link> 
      </div>
    </nav>
  );
};

export default Navbar;