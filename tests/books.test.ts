import {
  getBibleBooks,
  getBibleBooksOldTestament,
  getBibleBooksNewTestament,
} from "../src/books";

test("getBibleBooks returns all 66 books", () => {
  const books = getBibleBooks();
  expect(books).toHaveLength(66);
});

test("getBibleBooksOldTestament returns 39 books", () => {
  const books = getBibleBooksOldTestament();
  expect(books).toHaveLength(39);
});

test("getBibleBooksNewTestament returns 27 books", () => {
  const books = getBibleBooksNewTestament();
  expect(books).toHaveLength(27);
});

test("Each book has abbreviation and name", () => {
  const books = getBibleBooks();
  books.forEach((book) => {
    expect(book.abbreviation).toBeTruthy();
    expect(book.name).toBeTruthy();
  });
});

test("First OT book is Genesis", () => {
  const books = getBibleBooksOldTestament();
  expect(books[0].abbreviation).toBe("1Móz");
  expect(books[0].name).toBe("Mózes első könyve");
});

test("First NT book is Matthew", () => {
  const books = getBibleBooksNewTestament();
  expect(books[0].abbreviation).toBe("Mt");
  expect(books[0].name).toBe("Máté evangéliuma");
});
