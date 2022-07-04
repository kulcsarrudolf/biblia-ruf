const { readJSONFile } = require("./utils");

const getBibleBook = async (book) => await readJSONFile(`json/${book}.json`);

const getBiblePassage = async (passage) => {
  const book = passage.split(" ")[0];

  const chapter = passage.split(" ")[1].split(":")[0];
  const startVerse = passage.split(" ")[1].split(":")[1]?.split("-")[0];
  const endVerse = passage.split(" ")[1].split(":")[1]?.split("-")[1];

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
