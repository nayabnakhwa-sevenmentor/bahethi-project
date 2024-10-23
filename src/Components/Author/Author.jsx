
import React, { useState } from "react";
import "./Author.css";

const Author = () => {
  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Content for each page
  const pages = [
    { text: "Fortune favors the bold." },
    { text: "Life is what happens when you're busy making other plans." },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail." },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts." },
    { text: "The only limit to our realization of tomorrow is our doubts of today." },
    { text: "The purpose of our lives is to be happy." },
  ];

  // Total number of pages
  const totalPages = pages.length;

  // Handler for next and previous buttons
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Handler for specific page numbers
  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Determine which pages to show in the pagination (only show 3 pages at a time)
  const getPageRange = () => {
    let start = Math.max(0, currentPage - 1);
    let end = Math.min(start + 2, totalPages - 1);

    if (end - start < 2) {
      start = Math.max(0, end - 2);
    }

    return [...Array(end - start + 1)].map((_, index) => start + index);
  };

  return (
    <>
      <div className="authorcontainer">
        <div className="voice-chat-card">
          <div className="voice-chat-card-header">
            <img className="avatar" alt="avatar" />
            <div className="username">User name</div>
          </div>
          <div className="voice-chat-card-body">
            <div className="audio-container">
              <audio controls className="audiopart">
                <source type="audio/mp3" src="" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-name">Director's Notes</div>
          <div className="quote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 330 307"
              height="80"
              width="80"
            >
              <path
                fill="currentColor"
                d="M302.258 176.221C320.678 176.221 329.889 185.432 329.889 203.853V278.764C329.889 297.185 320.678 306.395 302.258 306.395H231.031C212.61 306.395 203.399 297.185 203.399 278.764V203.853C203.399 160.871 207.902 123.415 216.908 91.4858C226.323 59.1472 244.539 30.902 271.556 6.75027C280.562 -1.02739 288.135 -2.05076 294.275 3.68014L321.906 29.4692C328.047 35.2001 326.614 42.1591 317.608 50.3461C303.69 62.6266 292.228 80.4334 283.223 103.766C274.626 126.69 270.328 150.842 270.328 176.221H302.258ZM99.629 176.221C118.05 176.221 127.26 185.432 127.26 203.853V278.764C127.26 297.185 118.05 306.395 99.629 306.395H28.402C9.98126 306.395 0.770874 297.185 0.770874 278.764V203.853C0.770874 160.871 5.27373 123.415 14.2794 91.4858C23.6945 59.1472 41.9106 30.902 68.9277 6.75027C77.9335 -1.02739 85.5064 -2.05076 91.6467 3.68014L119.278 29.4692C125.418 35.2001 123.985 42.1591 114.98 50.3461C101.062 62.6266 89.6 80.4334 80.5942 103.766C71.9979 126.69 67.6997 150.842 67.6997 176.221H99.629Z"
              />
            </svg>
          </div>
          <div className="body-text">
            {/* Display the text based on the current page */}
            <span>{pages[currentPage].text}</span>
          </div>
          <div className="author">
            - by Virgil <br /> <span>(Latin poet)</span>{" "}
            <svg
              height=""
              width="18"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H24V24H0z" fill="none" />
              <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Pagination Component placed outside and aligned with the card */}
      <div className="pagination-container">
        {/* Hide the Previous button on the first page */}
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Previous
        </button>

        {/* Render only 3 page numbers at a time */}
        {getPageRange().map((pageNum) => (
          <button
            key={pageNum}
            className={currentPage === pageNum ? "active" : ""}
            onClick={() => handlePageClick(pageNum)}
          >
            {pageNum + 1}
          </button>
        ))}

        {/* Hide the Next button on the last page */}
        <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </>
  );
};

export default Author;
