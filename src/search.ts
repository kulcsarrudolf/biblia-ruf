import { readJSONFile } from './utils/utils';
import { getBibleBooksOldTestament, getBibleBooksNewTestament, getBibleBooks } from './books';
import { SearchOptions, SearchResult, ChapterData, BibleBook } from './types';

const getBooksByTestament = (testament?: 'old' | 'new'): BibleBook[] => {
  if (testament === 'old') return getBibleBooksOldTestament();
  if (testament === 'new') return getBibleBooksNewTestament();
  return getBibleBooks();
};

export const searchBible = (query: string, options: SearchOptions = {}): SearchResult[] => {
  const { testament, book, caseSensitive = false, limit = 100 } = options;

  let bookList: BibleBook[];
  if (book) {
    const allBooks = getBibleBooks();
    const found = allBooks.find((b) => b.abbreviation === book);
    bookList = found ? [found] : [];
  } else {
    bookList = getBooksByTestament(testament);
  }

  const results: SearchResult[] = [];
  const flags = caseSensitive ? '' : 'i';
  const regex = new RegExp(query, flags);

  for (const b of bookList) {
    if (results.length >= limit) break;

    let chapters: ChapterData[];
    try {
      chapters = readJSONFile<ChapterData[]>(`json/${b.abbreviation}.json`);
    } catch {
      continue;
    }

    for (const ch of chapters) {
      if (results.length >= limit) break;

      for (const v of ch.verses) {
        if (results.length >= limit) break;

        if (regex.test(v.text)) {
          results.push({
            book: b.abbreviation,
            bookName: b.name,
            chapter: ch.chapter,
            verse: v.verse,
            text: v.text,
            reference: `${b.abbreviation} ${ch.chapter}:${v.verse}`,
          });
        }
      }
    }
  }

  return results;
};
