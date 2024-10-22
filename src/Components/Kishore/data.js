export const chapters = [
  { id: 1, name: "Chapter 1", imageCount: 10 },
  { id: 2, name: "Chapter 2", imageCount: 10 },
  { id: 3, name: "Chapter 3", imageCount: 10 },
  // Add more chapters here
];

export const getChapterImages = async (chapterId) => {
  const images = [];
  const chapter = chapters.find(c => c.id === chapterId);
  
  if (chapter) {
    for (let i = 1; i <= chapter.imageCount; i++) {
      const imageModule = await import(`../../assets/chapter-${chapterId}/p_${String(i).padStart(3, '0')}.jpg`);
      images.push(imageModule.default);
    }
  }
  
  return images;
};