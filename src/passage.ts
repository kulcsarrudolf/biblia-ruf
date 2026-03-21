import { readJSONFile } from "./utils/utils";
import { parsePassage } from "./utils/passage-parser";
import { fetchBooks } from "./utils/helpers";
import { BibleVerse, ChapterData } from "./types";

const getBibleBook = async (book: string): Promise<ChapterData[]> => {
  try {
    return readJSONFile<ChapterData[]>(`json/${book}.json`);
  } catch {
    return fetchBooks(book);
  }
};

export const getBiblePassage = async (
  passage: string,
): Promise<BibleVerse[]> => {
  const parsedPassage = await parsePassage(passage);
  const { book, chapter, startVerse, endVerse } = parsedPassage[0];

  const currentBook = await getBibleBook(book);
  const currentChapter = currentBook.find((d) => d.chapter == chapter);

  if (!currentChapter) {
    throw new Error(`Chapter ${chapter} not found in ${book}`);
  }

  const result: BibleVerse[] = [];

  currentChapter.verses.forEach((v) => {
    const verseNum = parseInt(v.verse);
    if (
      (!startVerse && !endVerse) ||
      (startVerse && !endVerse && verseNum == startVerse) ||
      (startVerse && endVerse && verseNum >= startVerse && verseNum <= endVerse)
    ) {
      result.push({ verse: v.verse, text: v.text });
    }
  });

  return result;
};
