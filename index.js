const { getBiblePassage } = require("./src/");
const {
  getBibleBooks,
  getBibleBooksOldTestament,
  getBibleBooksNewTestament,
} = require("./src/");
const { getBookDetails } = require("./src/book-details");

module.exports = {
  getBiblePassage,
  getBibleBooks,
  getBibleBooksOldTestament,
  getBibleBooksNewTestament,
  getBookDetails,
};
