const { getBiblePassage } = require("./passage");
const {
  getBibleBooks,
  getBibleBooksOldTestament,
  getBibleBooksNewTestament,
} = require("./books");

const { getBookDetails } = require("./book-details");

module.exports = {
  getBiblePassage,
  getBibleBooks,
  getBibleBooksOldTestament,
  getBibleBooksNewTestament,
  getBookDetails,
};
