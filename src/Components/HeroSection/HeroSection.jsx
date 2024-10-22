import React from 'react';
import './HeroSection.css'
import kishore from '../../assets/kishore.png'
import noOne from '../../assets/photo-of-no-one.jpeg'
import { Link } from 'react-router-dom';


function HeroSection() {
  return (
    <>
    <div className="HeroContainer">
      <div className="container noselect">
      <Link to='/kishore'>
        <div className="canvas">
          {[...Array(25).keys()].map((index) => (
            <div key={index} className={`tracker tr-${index + 1}`}></div>
          ))}
          <div id="card">
          <div className="HeroImage">
        <img src={kishore} alt="kishore Image" />
      </div>
          </div>
        </div>
        </Link>
      </div>
      <div className="container noselect">
      <Link to='/no-one'>
        <div className="canvas">
          {[...Array(25).keys()].map((index) => (
            <div key={index} className={`tracker tr-${index + 1}`}></div>
          ))}
          <div id="card">
          <div className="HeroImage">
        <img src={noOne} alt="Photo of no one" />
      </div>
      </div>
          </div>
          </Link>
      </div>
    </div>
    </>
  );
}

export default HeroSection;