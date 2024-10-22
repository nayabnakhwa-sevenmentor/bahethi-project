import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import './Intro.css'

const IntroPage = () => {
  const [animate, setAnimate] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  if (location.pathname === '/') {
    setAnimate(true);
    setTimeout(() => {
      setRedirect(true);
      navigate('/HomePage');
    }, 1000);
  }
}, [location.pathname]);

  return (
    <div className="intro-page">
      {animate && (
        <div className="animation-container">
          <div className="logo">
            <img src={Logo} alt="S Plus Studios Logo" />
          </div>
          <div className="text">
            <h1>S Plus Studios</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroPage;