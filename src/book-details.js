const { readJSONFile } = require("./utils/utils");
const { fetchBooks, fetchBookDetails } = require("./utils/helpers");

const getBookDetails = async (book) => {
  try {
    let books;
    try {
      books = await readJSONFile("json/biblia.json");
    } catch {
      books = await fetchBookDetails();
    }

    let bookContent;
    try {
      bookContent = await readJSONFile(`json/${book}.json`);
    } catch {
      bookContent = await fetchBooks(book);
    }

    const verses = new Map();
    const res = books.find((b) => b.toc3 === book);
    bookContent.forEach((ch) => {
      verses.set(ch.chapter, ch.verses.length);
    });

    return {
      name: res.title,
      abbreviation: res.toc3,
      abbreviationEng: res.slug,
      chapters: res.chapter.length,
      verses: verses,
    };
  } catch (err) {
    console.log(err);

    throw {
      message: "Unexpected Error",
      err: err,
    };
  }
};

module.exports = {
  getBookDetails,
};
