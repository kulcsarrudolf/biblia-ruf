const { default: axios } = require("axios");

const fetchBookDetails = async () => {
  const BOOK_DETAILS_URL =
    "https://gist.githubusercontent.com/kulcsarrudolf/798cebd4ca163a925b272debad7d5a3b/raw/cd979d3cd801d730ccafa53c4b7fe3c032c5a025/biblia.json";

  const response = await axios.get(BOOK_DETAILS_URL);

  return response.data.book;
};

const getBookDetails = async (book) => {
  const books = await fetchBookDetails();
  const res = books.find((b) => b.toc3 === book);

  const verses = "#TBD";

  return {
    name: res.title,
    abbreviation: res.toc3,
    abbreviationEng: res.slug,
    chapters: res.chapter.length,
    verses: verses,
  };
};

module.exports = {
  getBookDetails,
};
