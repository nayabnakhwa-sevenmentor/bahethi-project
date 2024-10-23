import React, { lazy, Suspense, useState, useEffect, useRef } from "react";
import "./Kishore.css";
import { ClipLoader } from "react-spinners"; // Spinner for initial loading

const LazyChapter = lazy(() => import("./Chapter"));

const Kishore = () => {
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track image index in the chapter
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null); // To track scroll events

  useEffect(() => {
    import("./data")
      .then((module) => {
        setChapters(module.chapters);
        setActiveChapter(module.chapters[0]); // Load the first chapter
        setCurrentIndex(0);
        setCurrentImageIndex(0); // Initialize the first image index
        setLoading(false); // Hide spinner when data is loaded
      })
      .catch((error) => {
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentIndex]);

  // Load the next chapter when handleNext is called
  const handleNext = () => {
    if (currentIndex < chapters.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setActiveChapter(chapters[nextIndex]);
      setCurrentImageIndex(0); // Reset image index
    } else {
      setCurrentIndex(0);
      setActiveChapter(chapters[0]);
      setCurrentImageIndex(0); // Reset image index
    }

    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      setCurrentIndex(previousIndex);
      setActiveChapter(chapters[previousIndex]);
      setCurrentImageIndex(0); // Reset image index
    } else {
      setCurrentIndex(chapters.length - 1);
      setActiveChapter(chapters[chapters.length - 1]);
      setCurrentImageIndex(0); // Reset image index
    }

    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  // Handle chapter label click
  const handleChapterClick = (chapterIndex) => {
    setActiveChapter(chapters[chapterIndex]);
    setCurrentIndex(chapterIndex);
    setCurrentImageIndex(0); // Reset image index when switching chapters
    window.scrollTo(0, 0); // Scroll to top when switching chapters
  };

  // Handle image dot click
  const handleImageClick = (imageIndex) => {
    setCurrentImageIndex(imageIndex); // Set the clicked image index

    // Scroll to the selected image
    const selectedImage = imageRefs.current[imageIndex];
    if (selectedImage) {
      selectedImage.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapter.id} className="scroll-dot-container">
            {/* Main chapter dot */}
            <div className="mainDots">
              <div
                className={`scroll-dot ${
                  currentIndex === chapterIndex ? "active-dot" : ""
                }`}
                onClick={() => handleChapterClick(chapterIndex)}
              />

              {/* Sub-dots for images within each chapter */}
              <div className="sub-dots-container">
                {Array.from({ length: chapter.imageCount }).map(
                  (_, imageIndex) => (
                    <div
                      key={imageIndex}
                      className={`sub-dot ${
                        currentIndex === chapterIndex &&
                        currentImageIndex === imageIndex
                          ? "active-sub-dot"
                          : ""
                      }`}
                      onClick={() => handleImageClick(imageIndex)}
                    />
                  )
                )}
              </div>
            </div>
            <button
              className="scroll-dot-label"
              onClick={() => handleChapterClick(chapterIndex)}
            >
              {chapter.name}
            </button>
          </div>
        ))}
      </div>

      <div className="ImagesContainer" ref={scrollRef}>
        <Suspense
          fallback={<ClipLoader color="#000" size={50} className="mx-auto" />}
        >
          {activeChapter && (
            <LazyChapter
              chapter={activeChapter}
              currentImageIndex={currentImageIndex} // Pass the current image index to the chapter
              setCurrentImageIndex={setCurrentImageIndex} // Pass setCurrentImageIndex function to update image index
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
