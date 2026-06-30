import {
  getBiblePassage,
  getBibleBooksOldTestament,
  getBibleBooksNewTestament,
  getBookDetails,
  searchBible,
  getDailyVerse,
} from '../index';
import { help } from './help';
import { startRepl } from './repl';

const getArgValue = (prefix: string): string | undefined => {
  const arg = process.argv.find((val) => val.startsWith(prefix));
  if (!arg) return undefined;
  return arg.split('=')[1];
};

const hasArg = (name: string): boolean => process.argv.includes(name);

const getBiblePassageCli = async (): Promise<void> => {
  const passage = getArgValue('--passage=') ?? getArgValue('--p=');
  if (!passage) {
    console.error('No passage provided.');
    return;
  }

  const result = await getBiblePassage(passage);
  console.log(passage + '\n');
  result.forEach((v) => {
    console.log(`${v.verse}. ${v.text}`);
  });
};

const showBibleBooksCli = (): void => {
  if (hasArg('--old') || !hasArg('--new')) {
    console.log('Ószövetség\n');
    getBibleBooksOldTestament().forEach((b) => {
      console.log(`${b.name} (${b.abbreviation})`);
    });
    console.log();
  }

  if (hasArg('--new') || !hasArg('--old')) {
    console.log('Újszövetség\n');
    getBibleBooksNewTestament().forEach((b) => {
      console.log(`${b.name} (${b.abbreviation})`);
    });
  }
};

const getBookDetailsCli = async (): Promise<void> => {
  const requestedBook = process.argv[3];
  if (!requestedBook) {
    console.error('No book provided.');
    return;
  }

  const bookDetails = await getBookDetails(requestedBook);
  console.log({
    name: bookDetails.name,
    abbreviation: bookDetails.abbreviation,
    abbreviationEng: bookDetails.abbreviationEng,
    chapters: bookDetails.chapters,
  });
};

const searchCli = async (): Promise<void> => {
  const query = getArgValue('--search=');
  if (!query) {
    console.error('No search query provided.');
    return;
  }

  const testament = hasArg('--old')
    ? ('old' as const)
    : hasArg('--new')
      ? ('new' as const)
      : undefined;

  const results = searchBible(query, { testament, limit: 20 });
  if (results.length === 0) {
    console.log('No results found.');
    return;
  }

  results.forEach((r) => {
    console.log(`${r.reference}: ${r.text}`);
  });
};

const todayCli = (): void => {
  const result = getDailyVerse();
  console.log(`${result.reference}\n`);
  console.log(result.text);
};

export const runCli = async (): Promise<void> => {
  const args = process.argv;

  if (args.includes('-i')) {
    startRepl();
    return;
  }

  if (args.find((val) => val.startsWith('--p=') || val.startsWith('--passage='))) {
    await getBiblePassageCli();
  } else if (args.includes('--showBooks')) {
    showBibleBooksCli();
  } else if (args.includes('--bookDetails')) {
    await getBookDetailsCli();
  } else if (args.find((val) => val.startsWith('--search='))) {
    await searchCli();
  } else if (args.includes('--today')) {
    todayCli();
  } else if (args.includes('--help')) {
    help();
  } else {
    help();
  }
};
