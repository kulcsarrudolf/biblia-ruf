export interface BibleBook {
  abbreviation: string;
  name: string;
}

export interface BibleVerse {
  verse: string;
  text: string;
}

export interface ParsedPassage {
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
}

export interface BookDetails {
  name: string;
  abbreviation: string;
  abbreviationEng: string;
  chapters: number;
  verses: Map<number, number>;
}

export interface ChapterData {
  chapter: number;
  verses: BibleVerse[];
}

export interface BibliaEntry {
  title: string;
  toc2: string;
  toc3: string;
  slug: string;
  url: string;
  part: string;
  chapter: { number: number; title: string; slug: string; url: string }[];
}

export interface SearchOptions {
  testament?: "old" | "new";
  book?: string;
  caseSensitive?: boolean;
  limit?: number;
}

export interface SearchResult {
  book: string;
  bookName: string;
  chapter: number;
  verse: string;
  text: string;
  reference: string;
}

export interface DailyVerseResult {
  reference: string;
  book: string;
  chapter: number;
  verse: string;
  text: string;
}
