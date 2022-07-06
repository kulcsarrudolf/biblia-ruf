const { default: axios } = require("axios");

const fetchBooks = async (book) => {
  const encodedBook = encodeURI(book);
  const BOOK_URL = `https://raw.githubusercontent.com/kulcsarrudolf/biblia-ruf/main/json/${encodedBook}.json`;

  const response = await axios.get(BOOK_URL);

  return response.data;
};

const fetchBookDetails = async () => {
  const BOOK_DETAILS_URL =
    "https://raw.githubusercontent.com/kulcsarrudolf/biblia-ruf/main/json/biblia.json";

  const response = await axios.get(BOOK_DETAILS_URL);

  return response.data;
};

module.exports = {
  fetchBooks,
  fetchBookDetails,
};
