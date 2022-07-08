const { getBookDetails } = require("../book-details");

const getBookFromPassage = (passage) => passage.split(" ")[0];
const getChapterFromPassage = (passage) =>
  parseInt(passage.split(" ")[1].split(":")[0]);

const getVersesFromPassage = async (passage) => {
  const book = getBookFromPassage(passage);
  const chapter = getChapterFromPassage(passage);

  if (passage.split(" ")[1].split(":")[1]) {
    return passage
      .split(" ")[1]
      .split(":")[1]
      .split(",")
      .map((v) => {
        const startVerse = parseInt(v.split("-")[0]);
        const endVerse = parseInt(v.split("-")[1]);

        return {
          startVerse,
          endVerse: endVerse ? endVerse : startVerse,
        };
      });
  } else {
    const bookDetails = await getBookDetails(book);
    const numberOfVerses = bookDetails.verses.get(parseInt(chapter));

    return [{ startVerse: 1, endVerse: numberOfVerses }];
  }
};

const parsePassage = async (inputPassageString) => {
  const passages = inputPassageString.replaceAll("; ", ";").split(";");

  const result = await Promise.all(
    passages.map(async (passage) => {
      const book = getBookFromPassage(passage);
      const chapter = getChapterFromPassage(passage);
      const verseList = await getVersesFromPassage(passage);

      return verseList.map((v) => ({
        book,
        chapter,
        startVerse: v.startVerse,
        endVerse: v.endVerse,
      }));
    })
  );

  return [].concat.apply([], result);
};

module.exports = {
  parsePassage,
};
