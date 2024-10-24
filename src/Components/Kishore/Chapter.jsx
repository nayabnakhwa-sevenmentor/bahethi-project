import React, { useEffect, useRef, useState } from 'react';
import { getChapterImages } from './data'; // Adjust the import path
import { ClipLoader } from 'react-spinners';
import { gsap } from 'gsap';

const Chapter = ({ chapter }) => {
  const carouselRef = useRef(null); // Ref for the carousel container
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  let yPos = 0; // Track the Y position for dragging

  useEffect(() => {
    setLoading(true);
    getChapterImages(chapter.id)
      .then((fetchedImages) => {
        setImages(fetchedImages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error loading images for chapter ${chapter.id}:`, error);
        setLoading(false);
      });
  }, [chapter]);

  useEffect(() => {
    if (images.length > 0) {
      const ring = carouselRef.current;
      gsap.timeline()
        .set(ring, { rotationX: 180, cursor: 'grab' })
        .set('.img', {
          rotateX: (i) => -i * -36, // Adjust to your image count for correct spacing
          transformOrigin: '50% 50% 700px',
          z: -500,
          backgroundImage: (i) => `url(${images[i]})`, // Use the fetched images
          backgroundPosition: 'center',
          backfaceVisibility: 'hidden',
        })
        .from('.img', {
          duration: 1.5,
          x: 200,
          opacity: 0,
          stagger: 0.1,
          ease: 'expo',
        })
        .add(() => {
          const imgElements = document.querySelectorAll('.img');
          imgElements.forEach((img) => {
            img.addEventListener('mouseenter', (e) => {
              const current = e.currentTarget;
              gsap.to(imgElements, { opacity: (i, t) => (t === current) ? 1 : 0.5, ease: 'power3' });
            });
            img.addEventListener('mouseleave', () => {
              gsap.to(imgElements, { opacity: 1, ease: 'power2.inOut' });
            });
          });
        }, '-=0.5');

      // Dragging events
      const dragStart = (e) => {
        if (e.touches) e.clientY = e.touches[0].clientY;
        yPos = Math.round(e.clientY);
        gsap.set(ring, { cursor: 'grabbing' });
        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag);
      };

      const drag = (e) => {
        if (e.touches) e.clientY = e.touches[0].clientY;
        gsap.to(ring, {
          rotationX: `+=${Math.round(e.clientY) - yPos}`, // Adjust for vertical dragging
          onUpdate: () => {
            const imgElements = document.querySelectorAll('.img');
            imgElements.forEach((img) => gsap.set(img, { backgroundPosition: 'center' })); // Keep images centered
          },
        });
        yPos = Math.round(e.clientY);
      };

      const dragEnd = () => {
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('touchmove', drag);
        gsap.set(ring, { cursor: 'grab' });
      };

      window.addEventListener('mousedown', dragStart);
      window.addEventListener('touchstart', dragStart);
      window.addEventListener('mouseup', dragEnd);
      window.addEventListener('touchend', dragEnd);

      return () => {
        window.removeEventListener('mousedown', dragStart);
        window.removeEventListener('touchstart', dragStart);
        window.removeEventListener('mouseup', dragEnd);
        window.removeEventListener('touchend', dragEnd);
      };
    }
  }, [images]);

  return (
    <div className="carousel-container" style={{ perspective: '600px', height: '400px' }}>
      {loading ? (
        <ClipLoader color="#000" size={50} />
      ) : (
        <div className="ring" ref={carouselRef}>
          {images.map((image, index) => (
            <div
              key={index}
              className="img text-transparent"
              style={{
                position: 'absolute',
                width: '300px',
                height: '400px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Chapter;
