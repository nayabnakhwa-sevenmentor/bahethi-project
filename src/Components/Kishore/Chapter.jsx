import React, { useState, useEffect, useRef } from 'react';
import { getChapterImages } from './data';
import { ClipLoader } from 'react-spinners';

const Chapter = ({ chapter, handleNext }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const imageRefs = useRef([]);
  const lastImageRef = useRef(null); // Ref for the last image
  const observerRef = useRef(null); // To store the observer instance
  const hasTriggeredNextRef = useRef(false); // To prevent multiple triggers

  // Load images when the chapter changes
  useEffect(() => {
    hasTriggeredNextRef.current = false; // Reset trigger flag for new chapter
    setLoading(true); // Start loading when fetching new images
    getChapterImages(chapter.id)
      .then((images) => {
        setImages(images);
        setLoading(false); // End loading once images are fetched
      })
      .catch(error => {
        console.error(`Error loading images for chapter ${chapter.id}:`, error);
        setLoading(false); // Stop loading on error
      });
  }, [chapter]);

  // Scroll handler to scale images
  useEffect(() => {
    if (images.length > 0) {
      const handleScroll = () => {
        imageRefs.current.forEach((image) => {
          if (image) {
            const distance = getDistanceFromCenter(image);
            const scale = Math.max(1 - distance / 1000, 0.8);
            const zIndex = scale > 0.9 ? 10 : 0;
            image.style.transform = `scale(${scale})`;
            image.style.zIndex = zIndex;
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      // Initial call to set the correct scales on mount
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [images]);

  // Intersection Observer to detect when the last image is centered and fully scaled
  useEffect(() => {
    if (lastImageRef.current) {
      const handleIntersection = (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTriggeredNextRef.current) {
          // Check if the last image is fully scaled (scale >= 1)
          const image = entry.target;
          const computedStyle = window.getComputedStyle(image);
          const matrix = computedStyle.transform;
          let scale = 1; // Default scale

          if (matrix && matrix !== 'none') {
            const values = matrix.split('(')[1].split(')')[0].split(',');
            if (values.length === 6) {
              const scaleX = parseFloat(values[0]);
              const scaleY = parseFloat(values[3]);
              scale = (scaleX + scaleY) / 2;
            }
          }

          if (scale >= 1) {
            hasTriggeredNextRef.current = true; // Prevent multiple triggers
            handleNext(); // Load the next chapter
          }
        }
      };

      observerRef.current = new IntersectionObserver(handleIntersection, {
        root: null, // Observe relative to the viewport
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the last image is visible
      });

      observerRef.current.observe(lastImageRef.current);

      // Cleanup on unmount or when images change
      return () => {
        if (observerRef.current && lastImageRef.current) {
          observerRef.current.unobserve(lastImageRef.current);
        }
      };
    }
  }, [handleNext, images]);

  const getDistanceFromCenter = (element) => {
    const elementRect = element.getBoundingClientRect();
    const elementCenterY = elementRect.top + elementRect.height / 2;
    const viewportCenterY = window.innerHeight / 2;
    return Math.abs(viewportCenterY - elementCenterY);
  };

  return (
    <div className="ImageContainer" style={{ marginBottom: '150px' }}>
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          className="ImageHolder"
          style={{
            transition: 'transform 0.3s ease-out, z-index 0.3s ease-out',
            zIndex: 0,
          }}
        >
          <img src={image} alt={`pic${index + 1}`} loading="lazy" />
        </div>
      ))}
      {/* Assign ref to the last image and include spinner */}
      {images.length > 0 && (
        <div
          ref={lastImageRef}
          style={{
            height: '650px', // Minimal height to prevent affecting layout
            width: '100%',
            backgroundColor: 'transparent', // Invisible
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading && <ClipLoader color="#000" size={50} />}
        </div>
      )}
    </div>
  );
};

export default Chapter;
