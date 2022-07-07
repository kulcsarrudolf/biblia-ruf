const parsePassage = (passage) => {
  const book = passage.split(" ")[0];
  const chapter = passage.split(" ")[1].split(":")[0];
  const startVerse = passage.split(" ")[1].split(":")[1]?.split("-")[0];
  const endVerse = passage.split(" ")[1].split(":")[1]?.split("-")[1];

  return {
    book,
    chapter,
    startVerse,
    endVerse,
  };
};

module.exports = {
  parsePassage,
};
