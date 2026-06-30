import { readJSONFile } from './utils/utils';
import { DailyVerseResult, ChapterData } from './types';

const CURATED_VERSES: {
  ref: string;
  book: string;
  chapter: number;
  verse: string;
}[] = [
  { ref: '1Móz 1:1', book: '1Móz', chapter: 1, verse: '1' },
  { ref: 'Zsolt 23:1', book: 'Zsolt', chapter: 23, verse: '1' },
  { ref: 'Zsolt 27:1', book: 'Zsolt', chapter: 27, verse: '1' },
  { ref: 'Zsolt 46:2', book: 'Zsolt', chapter: 46, verse: '2' },
  { ref: 'Zsolt 91:1', book: 'Zsolt', chapter: 91, verse: '1' },
  { ref: 'Zsolt 100:1', book: 'Zsolt', chapter: 100, verse: '1' },
  { ref: 'Zsolt 119:105', book: 'Zsolt', chapter: 119, verse: '105' },
  { ref: 'Zsolt 121:1', book: 'Zsolt', chapter: 121, verse: '1' },
  { ref: 'Zsolt 139:23', book: 'Zsolt', chapter: 139, verse: '23' },
  { ref: 'Péld 3:5', book: 'Péld', chapter: 3, verse: '5' },
  { ref: 'Péld 3:6', book: 'Péld', chapter: 3, verse: '6' },
  { ref: 'Péld 16:3', book: 'Péld', chapter: 16, verse: '3' },
  { ref: 'Ézs 40:31', book: 'Ézs', chapter: 40, verse: '31' },
  { ref: 'Ézs 41:10', book: 'Ézs', chapter: 41, verse: '10' },
  { ref: 'Jer 29:11', book: 'Jer', chapter: 29, verse: '11' },
  { ref: 'Mt 5:16', book: 'Mt', chapter: 5, verse: '16' },
  { ref: 'Mt 6:33', book: 'Mt', chapter: 6, verse: '33' },
  { ref: 'Mt 11:28', book: 'Mt', chapter: 11, verse: '28' },
  { ref: 'Mt 28:20', book: 'Mt', chapter: 28, verse: '20' },
  { ref: 'Jn 1:1', book: 'Jn', chapter: 1, verse: '1' },
  { ref: 'Jn 3:16', book: 'Jn', chapter: 3, verse: '16' },
  { ref: 'Jn 8:12', book: 'Jn', chapter: 8, verse: '12' },
  { ref: 'Jn 10:10', book: 'Jn', chapter: 10, verse: '10' },
  { ref: 'Jn 11:25', book: 'Jn', chapter: 11, verse: '25' },
  { ref: 'Jn 14:6', book: 'Jn', chapter: 14, verse: '6' },
  { ref: 'Jn 14:27', book: 'Jn', chapter: 14, verse: '27' },
  { ref: 'Jn 15:5', book: 'Jn', chapter: 15, verse: '5' },
  { ref: 'Róm 5:8', book: 'Róm', chapter: 5, verse: '8' },
  { ref: 'Róm 8:28', book: 'Róm', chapter: 8, verse: '28' },
  { ref: 'Róm 8:38', book: 'Róm', chapter: 8, verse: '38' },
  { ref: 'Róm 12:2', book: 'Róm', chapter: 12, verse: '2' },
  { ref: '1Kor 10:13', book: '1Kor', chapter: 10, verse: '13' },
  { ref: '1Kor 13:4', book: '1Kor', chapter: 13, verse: '4' },
  { ref: '1Kor 13:13', book: '1Kor', chapter: 13, verse: '13' },
  { ref: '2Kor 5:17', book: '2Kor', chapter: 5, verse: '17' },
  { ref: '2Kor 12:9', book: '2Kor', chapter: 12, verse: '9' },
  { ref: 'Gal 2:20', book: 'Gal', chapter: 2, verse: '20' },
  { ref: 'Gal 5:22', book: 'Gal', chapter: 5, verse: '22' },
  { ref: 'Ef 2:8', book: 'Ef', chapter: 2, verse: '8' },
  { ref: 'Ef 6:10', book: 'Ef', chapter: 6, verse: '10' },
  { ref: 'Fil 1:6', book: 'Fil', chapter: 1, verse: '6' },
  { ref: 'Fil 4:6', book: 'Fil', chapter: 4, verse: '6' },
  { ref: 'Fil 4:13', book: 'Fil', chapter: 4, verse: '13' },
  { ref: 'Kol 3:23', book: 'Kol', chapter: 3, verse: '23' },
  { ref: '2Tim 1:7', book: '2Tim', chapter: 1, verse: '7' },
  { ref: 'Zsid 11:1', book: 'Zsid', chapter: 11, verse: '1' },
  { ref: 'Zsid 12:2', book: 'Zsid', chapter: 12, verse: '2' },
  { ref: 'Jak 1:5', book: 'Jak', chapter: 1, verse: '5' },
  { ref: '1Pt 5:7', book: '1Pt', chapter: 5, verse: '7' },
  { ref: '1Jn 4:8', book: '1Jn', chapter: 4, verse: '8' },
  { ref: 'Jel 21:4', book: 'Jel', chapter: 21, verse: '4' },
];

const hashDate = (date: Date): number => {
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

export const getDailyVerse = (date?: Date): DailyVerseResult => {
  const targetDate = date ?? new Date();
  const index = hashDate(targetDate) % CURATED_VERSES.length;
  const entry = CURATED_VERSES[index];

  let text: string;
  try {
    const chapters = readJSONFile<ChapterData[]>(`json/${entry.book}.json`);
    const chapter = chapters.find((ch) => ch.chapter === entry.chapter);
    const verse = chapter?.verses.find((v) => v.verse === entry.verse);
    text = verse?.text ?? 'Verse not found';
  } catch {
    text = 'Could not load verse data';
  }

  return {
    reference: entry.ref,
    book: entry.book,
    chapter: entry.chapter,
    verse: entry.verse,
    text,
  };
};
