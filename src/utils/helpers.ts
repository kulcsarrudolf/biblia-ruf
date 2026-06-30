import { ChapterData, BibliaEntry } from '../types';

export const fetchBooks = async (book: string): Promise<ChapterData[]> => {
  const encodedBook = encodeURI(book);
  const url = `https://raw.githubusercontent.com/kulcsarrudolf/biblia-ruf/main/json/${encodedBook}.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return response.json() as Promise<ChapterData[]>;
};

export const fetchBookDetails = async (): Promise<BibliaEntry[]> => {
  const url = 'https://raw.githubusercontent.com/kulcsarrudolf/biblia-ruf/main/json/biblia.json';
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return response.json() as Promise<BibliaEntry[]>;
};
