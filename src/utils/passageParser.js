const { getBookDetails } = require("../book-details");

const parsePassage = async (passage) => {
  const result = [];
  const book = passage.split(" ")[0];
  const chapter = passage.split(" ")[1].split(":")[0];

  let verses = [];

  try {
    verses = passage.split(" ")[1].split(":")[1].split(",");

    verses.forEach((v) => {
      const startVerse = parseInt(v.split("-")[0]);
      const endVerse = parseInt(v.split("-")[1]);

      result.push({
        book,
        chapter,
        startVerse,
        endVerse: endVerse ? endVerse : startVerse,
      });
    });
  } catch {
    const bookDetails = await getBookDetails(book);
    const numberOfVerses = bookDetails.verses.get(parseInt(chapter));

    result.push({
      book,
      chapter,
      startVerse: 1,
      endVerse: numberOfVerses,
    });
  }

  return result;
};

module.exports = {
  parsePassage,
};
