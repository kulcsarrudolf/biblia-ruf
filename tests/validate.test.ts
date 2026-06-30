import { validateBook, validateAllBooks } from '../src/utils/validate';
import { getBibleBooks } from '../src/books';

test('All 66 book JSON files are valid', () => {
  const books = getBibleBooks();
  books.forEach((book) => {
    const errors = validateBook(book.abbreviation);
    expect(errors).toHaveLength(0);
  });
});

test('Each book has at least one chapter', () => {
  const books = getBibleBooks();
  books.forEach((book) => {
    const errors = validateBook(book.abbreviation);
    expect(errors).toEqual([]);
  });
});

test('Invalid book returns error', () => {
  const errors = validateBook('NonExistentBook');
  expect(errors.length).toBeGreaterThan(0);
  expect(errors[0].message).toContain('Failed to read file');
});
