const { readJSONFile } = require("./utils/utils");
const { parsePassage } = require("./utils/passageParser");
const { fetchBooks } = require("./utils/helpers");

const getBibleBook = async (book) => {
  let bookContent;
  try {
    bookContent = await readJSONFile(`json/${book}.json`);
  } catch {
    bookContent = await fetchBooks(book);
  }

  return bookContent;
};

const getBiblePassage = async (passage) => {
  const parsedPassage = await parsePassage(passage);
  const { book, chapter, startVerse, endVerse } = parsedPassage[0];

  const currentBook = await getBibleBook(book);
  const currentChapter = currentBook.find((d) => d.chapter == chapter);

  const result = [];

  currentChapter.verses.forEach((v) => {
    if (
      (!startVerse && !endVerse) ||
      (startVerse && !endVerse && v.verse == startVerse) ||
      (startVerse && endVerse && v.verse >= startVerse && v.verse <= endVerse)
    ) {
      result.push({ verse: v.verse, text: v.text });
    }
  });

  return result;
};

module.exports = {
  getBiblePassage,
};
