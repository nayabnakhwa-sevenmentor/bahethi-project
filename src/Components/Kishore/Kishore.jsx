import React, { lazy, Suspense, useState, useEffect, useRef } from "react";
import './Kishore.css';
import { ClipLoader } from 'react-spinners'; // Spinner for initial loading

const LazyChapter = lazy(() => import('./Chapter'));

const Kishore = () => {
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null); // To track scroll events

  useEffect(() => {
    import('./data').then(module => {
      setChapters(module.chapters);
      setActiveChapter(module.chapters[0]); // Load the first chapter
      setCurrentIndex(0);
      setLoading(false); // Hide spinner when data is loaded
    }).catch(error => {
      console.error("Error loading chapters:", error);
      setLoading(false); // Even on error, stop loading spinner
    });
  }, []);

  // Scroll listener to detect when user scrolls to top for previous chapter
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && currentIndex > 0) {
        handlePrevious();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex]);

  // Load the next chapter when handleNext is called
  const handleNext = () => {
    if (currentIndex < chapters.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setActiveChapter(chapters[nextIndex]);
    } else {
      // Loop back to the first chapter if it's the last one
      setCurrentIndex(0);
      setActiveChapter(chapters[0]);
    }
    window.scrollTo(0, 0); // Scroll to the top after loading the chapter
  };

  // Load the previous chapter when handlePrevious is called
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      setCurrentIndex(previousIndex);
      setActiveChapter(chapters[previousIndex]);
    } else {
      // Loop back to the last chapter if it's the first one
      setCurrentIndex(chapters.length - 1);
      setActiveChapter(chapters[chapters.length - 1]);
    }
    window.scrollTo(0, 0); // Scroll to the top after loading the chapter
  };

  // Handle chapter label click
  const handleChapterClick = (chapterIndex) => {
    setActiveChapter(chapters[chapterIndex]);
    setCurrentIndex(chapterIndex);
    window.scrollTo(0, 0); // Scroll to top when switching chapters
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#000" size={50} /> {/* Centered spinner */}
      </div>
    );
  }

  return (
    <div className="KishoreContainer">
      <div className="scroll-bar">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="scroll-dot-container">
            <div
              className={`scroll-dot ${currentIndex === index ? "active-dot" : ""}`}
              onClick={() => handleChapterClick(index)}
            />
            <button
              className="scroll-dot-label"
              onClick={() => handleChapterClick(index)}
            >
              {chapter.name}
            </button>
          </div>
        ))}
      </div>

      <div className="ImagesContainer" ref={scrollRef}>
        <Suspense fallback={<ClipLoader color="#000" size={50} className="mx-auto" />}>
          {activeChapter && (
            <LazyChapter
              chapter={activeChapter}
              handleNext={handleNext} // Load next chapter when the trigger div is visible
              handlePrevious={handlePrevious} // Load previous chapter when scrolling to top
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Kishore;
