import { getBookDetails } from "../book-details";
import { ParsedPassage } from "../types";

const getBookFromPassage = (passage: string): string => passage.split(" ")[0];

const getChapterFromPassage = (passage: string): number =>
  parseInt(passage.split(" ")[1].split(":")[0]);

interface VerseRange {
  startVerse: number;
  endVerse: number;
}

const getVersesFromPassage = async (passage: string): Promise<VerseRange[]> => {
  const book = getBookFromPassage(passage);
  const chapter = getChapterFromPassage(passage);

  if (passage.split(" ")[1].split(":")[1]) {
    return passage
      .split(" ")[1]
      .split(":")[1]
      .split(",")
      .map((v) => {
        const startVerse = parseInt(v.split("-")[0]);
        const endVerse = parseInt(v.split("-")[1]);

        return {
          startVerse,
          endVerse: endVerse ? endVerse : startVerse,
        };
      });
  } else {
    const bookDetails = await getBookDetails(book);
    const numberOfVerses = bookDetails.verses.get(chapter);

    return [{ startVerse: 1, endVerse: numberOfVerses ?? 0 }];
  }
};

export const parsePassage = async (
  inputPassageString: string,
): Promise<ParsedPassage[]> => {
  const passages = inputPassageString.replace(/; /g, ";").split(";");

  const result = await Promise.all(
    passages.map(async (passage) => {
      const book = getBookFromPassage(passage);
      const chapter = getChapterFromPassage(passage);
      const verseList = await getVersesFromPassage(passage);

      return verseList.map((v) => ({
        book,
        chapter,
        startVerse: v.startVerse,
        endVerse: v.endVerse,
      }));
    }),
  );

  return ([] as ParsedPassage[]).concat(...result);
};
