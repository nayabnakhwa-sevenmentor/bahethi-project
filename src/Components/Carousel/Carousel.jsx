import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Carousel.css'; // Make sure your CSS file is correctly referenced

const Carousel = () => {
  const ringRef = useRef(null);
  const imgRefs = useRef([]);

  let yPos = 0;

//   useEffect(() => {
//     const ring = ringRef.current;

//     gsap.timeline()
//       .set(ring, { rotationX: 180, cursor: 'grab' })
//       .set(imgRefs.current, {
//         rotateX: (i) => i * -36,
//         transformOrigin: '50% 50% 700px',
//         z: -500,
//         backgroundImage: (i) => `url(https://picsum.photos/id/${i + 32}/600/400/)`,
//         backfaceVisibility: 'hidden',
//       })
//       .from(imgRefs.current, {
//         duration: 1.5,
//         y: 200,
//         opacity: 0,
//         stagger: 0.1,
//         ease: 'expo',
//       })
//       .add(() => {
//         imgRefs.current.forEach((img) => {
//           img.addEventListener('mouseenter', () => {
//             gsap.to(imgRefs.current, {
//               opacity: (t) => (t === img) ? 1 : 0.5,
//               ease: 'power3',
//             });
//           });
//           img.addEventListener('mouseleave', () => {
//             gsap.to(imgRefs.current, { opacity: 1, ease: 'power2.inOut' });
//           });
//         });
//       }, '-=0.5');

//     const dragStart = (e) => {
//       if (e.touches) e.clientY = e.touches[0].clientY;
//       yPos = Math.round(e.clientY);
//       gsap.set(ring, { cursor: 'grabbing' });
//       window.addEventListener('mousemove', drag);
//       window.addEventListener('touchmove', drag);
//     };

//     const drag = (e) => {
//       if (e.touches) e.clientY = e.touches[0].clientY;
//       gsap.to(ring, {
//         rotationX: `+=${(Math.round(e.clientY) - yPos) % 360}`,
//         onUpdate: () => {
//           gsap.set(imgRefs.current, { backgroundPosition: 'center' });
//         },
//       });
//       yPos = Math.round(e.clientY);
//     };

//     const dragEnd = () => {
//       window.removeEventListener('mousemove', drag);
//       window.removeEventListener('touchmove', drag);
//       gsap.set(ring, { cursor: 'grab' });
//     };

//     window.addEventListener('mousedown', dragStart);
//     window.addEventListener('touchstart', dragStart);
//     window.addEventListener('mouseup', dragEnd);
//     window.addEventListener('touchend', dragEnd);

//     return () => {
//       window.removeEventListener('mousedown', dragStart);
//       window.removeEventListener('touchstart', dragStart);
//       window.removeEventListener('mouseup', dragEnd);
//       window.removeEventListener('touchend', dragEnd);
//     };
//   }, []);

  return (
    <div className="stage">
      <div className="container">
        <div className="ring" ref={ringRef}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="img" ref={(el) => imgRefs.current[i] = el} key={i}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
