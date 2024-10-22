import React, { useState, useEffect, useRef } from 'react';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import './NoOne.css';

function NoOne() {
  const [images, setImages] = useState([]);
  const [cardImages, setCardImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(true); // To track loading state
  const [activeCard, setActiveCard] = useState(null); // To track the clicked card

  const cardContainerRef = useRef(null); // Reference for the card container

  useEffect(() => {
    // Dynamically import the images
    const loadImages = async () => {
      const { images: importedImages, cardImages: importedCardImages } = await import('./NoOneData.js');
      setImages(importedImages);
      setCardImages(importedCardImages);
      setLoading(false); // Stop showing spinner once images are loaded
    };
    loadImages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 1000);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleCardClick = (index) => {
    setActiveCard(index); // Set the clicked card as active
  };

  // Handle click outside of card container
  const handleOutsideClick = (event) => {
    if (cardContainerRef.current && !cardContainerRef.current.contains(event.target)) {
      setActiveCard(null); // Reset active card when clicking outside
    }
  };

  // Add event listener for clicks outside the card container
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#000" size={50} /> {/* Centered spinner */}
      </div>
    );
  }

  return (
    <div className="NoOne">
      {/* Display the large images */}
      <div className="large-image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className={`large-image ${
              index === currentIndex ? 'visible' : 'hidden'
            }`}
          />
        ))}
      </div>

      {/* Display the card images */}
      <div className="card-container" ref={cardContainerRef}>
        {cardImages.map((image, index) => (
          <div
            key={index}
            className={`card ${activeCard === index ? 'active' : ''}`}
            onClick={() => handleCardClick(index)} // Handle card click
          >
            <img src={image} alt="" className="card-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoOne;
