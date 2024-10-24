// Kishore.js
import React, { lazy, Suspense, useState, useEffect } from "react";
import { ClipLoader } from 'react-spinners';
import './Kishore.css';

const LazyChapter = lazy(() => import('./Chapter'));

const Kishore = () => {
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('./data').then(module => {
      setChapters(module.chapters);
      setActiveChapter(module.chapters[0]);
      setCurrentIndex(0);
      setLoading(false);
    }).catch(error => {
      console.error("Error loading chapters:", error);
      setLoading(false);
    });
  }, []);

  const handleChapterClick = (chapterIndex) => {
    setActiveChapter(chapters[chapterIndex]);
    setCurrentIndex(chapterIndex);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#000" size={50} />
      </div>
    );
  }

  return (
    <div className="manga-container">
      {/* Chapter Navigation */}
      <nav className="chapter-nav">
        <div className="chapter-list">
          {chapters.map((chapter, index) => (
            <div 
              key={chapter.id} 
              className={`chapter-item ${currentIndex === index ? 'active' : ''}`}
            >
              <button
                className="chapter-button"
                onClick={() => handleChapterClick(index)}
              >
                <span className="chapter-dot"></span>
                <span className="chapter-name">{chapter.name}</span>
              </button>
            </div>
          ))}
        </div>
      </nav>

      {/* Content Area */}
      <main className="content-area">
        <Suspense fallback={<ClipLoader color="#000" size={50} />}>
          {activeChapter && (
            <LazyChapter chapter={activeChapter} />
          )}
        </Suspense>
      </main>
    </div>
  );
};

export default Kishore;
