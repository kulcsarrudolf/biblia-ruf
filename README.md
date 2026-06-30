# Biblia RÚF

[![npm version](https://badgen.net/npm/v/biblia-ruf)](https://www.npmjs.com/package/biblia-ruf)
[![license](https://badgen.net/npm/license/biblia-ruf)](https://github.com/kulcsarrudolf/biblia-ruf/blob/main/LICENSE)
[![downloads](https://badgen.net/npm/dt/biblia-ruf)](https://www.npmjs.com/package/biblia-ruf)
[![GitHub Stars](https://badgen.net/github/stars/kulcsarrudolf/biblia-ruf)](https://github.com/kulcsarrudolf/biblia-ruf)
[![CI](https://img.shields.io/github/actions/workflow/status/kulcsarrudolf/biblia-ruf/ci.yml?label=CI)](https://github.com/kulcsarrudolf/biblia-ruf/actions/workflows/ci.yml)

Revideált új fordítás (RÚF) Biblia library and CLI tool. Access Bible passages, search verses, get daily verses — works in Node.js, React, and as a CLI.

## Installation

```bash
# As a dependency
npm install biblia-ruf

# Global CLI
npm install -g biblia-ruf
```

## Quick Start

```typescript
import {
  getBiblePassage,
  getBibleBooks,
  getBookDetails,
  searchBible,
  getDailyVerse,
} from "biblia-ruf";

// Get a passage
const verses = await getBiblePassage("Jn 3:16");
// [{ verse: "16", text: "Mert úgy szerette Isten a világot..." }]

// Get all Bible books
const books = getBibleBooks(); // 66 books

// Get book details
const details = await getBookDetails("Zsolt");
// { name: "A Zsoltárok könyve", chapters: 150, ... }

// Search the Bible
const results = searchBible("szeretet", { limit: 10 });
// [{ reference: "Jn 3:16", text: "...", ... }]

// Get today's verse
const daily = getDailyVerse();
// { reference: "Jn 3:16", text: "...", ... }
```

## API Reference

### `getBiblePassage(passage: string): Promise<BibleVerse[]>`

Get verses from a Bible passage.

```typescript
await getBiblePassage("Jn 3:16");        // Single verse
await getBiblePassage("Zsolt 139:23-24"); // Verse range
await getBiblePassage("Zsolt 100");       // Entire chapter
```

### `getBibleBooks(): BibleBook[]`

Returns all 66 Bible books.

### `getBibleBooksOldTestament(): BibleBook[]`

Returns 39 Old Testament books.

### `getBibleBooksNewTestament(): BibleBook[]`

Returns 27 New Testament books.

### `getBookDetails(book: string): Promise<BookDetails>`

Get metadata about a Bible book.

```typescript
const details = await getBookDetails("Zsolt");
// {
//   name: "A Zsoltárok könyve",
//   abbreviation: "Zsolt",
//   abbreviationEng: "PSA",
//   chapters: 150,
//   verses: Map { 1 => 6, 2 => 12, ... }
// }
```

### `searchBible(query: string, options?: SearchOptions): SearchResult[]`

Full-text search across the Bible.

```typescript
searchBible("szeretet");
searchBible("Isten", { testament: "new", limit: 10 });
searchBible("hit", { book: "Zsid" });
searchBible("Jézus", { caseSensitive: true });
```

**Options:**

| Option          | Type                 | Default | Description                     |
| --------------- | -------------------- | ------- | ------------------------------- |
| `testament`     | `"old"` \| `"new"`   | all     | Filter by testament             |
| `book`          | `string`             | all     | Filter by book abbreviation     |
| `caseSensitive` | `boolean`            | `false` | Case sensitive search           |
| `limit`         | `number`             | `100`   | Maximum number of results       |

### `getDailyVerse(date?: Date): DailyVerseResult`

Get a deterministic daily verse. Same date always returns the same verse.

```typescript
const today = getDailyVerse();
const specific = getDailyVerse(new Date(2024, 0, 1));
```

## CLI Usage

```bash
# Get a passage
biblia --p="Zsolt 100"
biblia --p="Zsolt 100:1"
biblia --p="Zsolt 100:1-2"

# List books
biblia --showBooks
biblia --showBooks --old
biblia --showBooks --new

# Book details
biblia --bookDetails Zsolt

# Search
biblia --search="szeretet"
biblia --search="Isten" --new

# Daily verse
biblia --today

# Interactive mode
biblia -i

# Help
biblia --help
```

### Interactive Mode

Start a REPL session with `biblia -i`:

```
biblia> Jn 3:16
biblia> search szeretet
biblia> today
biblia> help
biblia> exit
```

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  BibleBook,
  BibleVerse,
  ParsedPassage,
  BookDetails,
  SearchOptions,
  SearchResult,
  DailyVerseResult,
} from "biblia-ruf";
```

## Demo

### CLI Demo

[![Demo Video](https://img.youtube.com/vi/OTjdE183tpo/0.jpg)](https://www.youtube.com/watch?v=OTjdE183tpo)

### React Demo

[CodeSandbox - React Project](https://codesandbox.io/s/biblia-ruf-demo-7krnc9)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Run tests: `npm test`
4. Format code: `npm run format`
5. Commit your changes
6. Push to the branch and open a Pull Request

## License

[MIT](LICENSE) © [Kulcsár Rudolf](https://kulcsarrudolf.com/)
