import { readJSONFile } from './utils/utils';
import { fetchBooks, fetchBookDetails } from './utils/helpers';
import { BookDetails, ChapterData, BibliaEntry } from './types';

export const getBookDetails = async (book: string): Promise<BookDetails> => {
  let books: BibliaEntry[];
  try {
    books = readJSONFile<BibliaEntry[]>('json/biblia.json');
  } catch {
    books = await fetchBookDetails();
  }

  let bookContent: ChapterData[];
  try {
    bookContent = readJSONFile<ChapterData[]>(`json/${book}.json`);
  } catch {
    bookContent = await fetchBooks(book);
  }

  const verses = new Map<number, number>();
  const res = books.find((b) => b.toc3 === book);

  if (!res) {
    throw new Error(`Book not found: ${book}`);
  }

  bookContent.forEach((ch) => {
    verses.set(ch.chapter, ch.verses.length);
  });

  return {
    name: res.title,
    abbreviation: res.toc3,
    abbreviationEng: res.slug,
    chapters: res.chapter.length,
    verses,
  };
};
