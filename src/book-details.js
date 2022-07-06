const { readJSONFile } = require("./utils");

const getBookDetails = async (book) => {
  const verses = new Map();
  const books = await readJSONFile("json/biblia.json");
  const res = books.find((b) => b.toc3 === book);

  try {
    const bookContent = await readJSONFile(`json/${book}.json`);

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
    return err;
  }
};

module.exports = {
  getBookDetails,
};
