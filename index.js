const { default: axios } = require("axios");

const fetchBibleBook = async (book) => {
  const encodedBook = encodeURI(book);
  const BOOK_URL = `https://raw.githubusercontent.com/kulcsarrudolf/biblia/main/json/${encodedBook}.json`;

  const response = await axios.get(BOOK_URL);

  return response.data;
};

const fetchBible = async () => {
  const passage = process.argv
    .find((val) => val.includes("--passage") || val.includes("--p"))
    .split("=")[1];

  const book = passage.split(" ")[0];

  const chapter = passage.split(" ")[1].split(":")[0];
  const startVerse = passage.split(" ")[1].split(":")[1]?.split("-")[0];
  const endVerse = passage.split(" ")[1].split(":")[1]?.split("-")[1];

  console.log(passage + "\n");

  const currentBook = await fetchBibleBook(book);
  const currentChapter = currentBook.find((d) => d.chapter == chapter);

  currentChapter.verses.forEach((v) => {
    if (
      (!startVerse && !endVerse) ||
      (startVerse && !endVerse && v.verse == startVerse) ||
      (startVerse && endVerse && v.verse >= startVerse && v.verse <= endVerse)
    ) {
      console.log(`${v.verse}. ${v.text}`);
    }
  });
};

fetchBible();
