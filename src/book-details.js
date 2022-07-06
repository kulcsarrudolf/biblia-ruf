const { readJSONFile } = require("./utils");

const getBookDetails = async (book) => {
  try {
    const books = await readJSONFile("json/biblia.json");
    const bookContent = await readJSONFile(`json/${book}.json`);

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
    throw {
      message: "Unexpected Error",
      err: err,
    };
  }
};

module.exports = {
  getBookDetails,
};
