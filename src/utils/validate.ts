import * as fs from "fs";
import * as path from "path";
import { ChapterData } from "../types";
import { readJSONFile } from "./utils";
import { getBibleBooks } from "../books";

export interface ValidationError {
  book: string;
  message: string;
}

const validateBookData = (book: string, data: unknown): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!Array.isArray(data)) {
    errors.push({ book, message: "Root must be an array" });
    return errors;
  }

  for (let i = 0; i < data.length; i++) {
    const chapter = data[i] as ChapterData;

    if (typeof chapter.chapter !== "number") {
      errors.push({
        book,
        message: `Chapter at index ${i}: missing or invalid "chapter" field`,
      });
    }

    if (!Array.isArray(chapter.verses)) {
      errors.push({
        book,
        message: `Chapter ${chapter.chapter}: "verses" must be an array`,
      });
      continue;
    }

    for (let j = 0; j < chapter.verses.length; j++) {
      const verse = chapter.verses[j];
      if (typeof verse.verse !== "string") {
        errors.push({
          book,
          message: `Chapter ${chapter.chapter}, verse index ${j}: missing "verse" field`,
        });
      }
      if (typeof verse.text !== "string") {
        errors.push({
          book,
          message: `Chapter ${chapter.chapter}, verse ${verse.verse}: missing "text" field`,
        });
      }
    }
  }

  return errors;
};

export const validateBook = (abbreviation: string): ValidationError[] => {
  try {
    const data = readJSONFile<unknown>(`json/${abbreviation}.json`);
    return validateBookData(abbreviation, data);
  } catch (err) {
    return [
      {
        book: abbreviation,
        message: `Failed to read file: ${err instanceof Error ? err.message : String(err)}`,
      },
    ];
  }
};

export const validateAllBooks = (): ValidationError[] => {
  const books = getBibleBooks();
  const allErrors: ValidationError[] = [];

  for (const book of books) {
    const errors = validateBook(book.abbreviation);
    allErrors.push(...errors);
  }

  if (allErrors.length === 0) {
    console.log(`All ${books.length} books validated successfully.`);
  } else {
    console.error(`Found ${allErrors.length} validation error(s):`);
    allErrors.forEach((e) => {
      console.error(`  [${e.book}] ${e.message}`);
    });
    process.exit(1);
  }

  return allErrors;
};
