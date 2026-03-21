import * as readline from "readline";
import { getBiblePassage, searchBible, getDailyVerse } from "../index";
import { help } from "./help";

export const startRepl = (): void => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "biblia> ",
  });

  console.log("Biblia RÚF — Interactive mode");
  console.log(
    'Type a passage (e.g. "Jn 3:16"), "search <query>", "today", "help", or "exit"\n',
  );
  rl.prompt();

  rl.on("line", async (line: string) => {
    const input = line.trim();

    if (!input) {
      rl.prompt();
      return;
    }

    if (input === "exit" || input === "quit") {
      rl.close();
      return;
    }

    if (input === "help") {
      help();
      rl.prompt();
      return;
    }

    if (input === "today") {
      const result = getDailyVerse();
      console.log(`\n${result.reference}`);
      console.log(`${result.text}\n`);
      rl.prompt();
      return;
    }

    if (input.startsWith("search ")) {
      const query = input.slice(7);
      const results = searchBible(query, { limit: 10 });
      console.log();
      if (results.length === 0) {
        console.log("No results found.\n");
      } else {
        results.forEach((r) => {
          console.log(`${r.reference}: ${r.text}`);
        });
        console.log();
      }
      rl.prompt();
      return;
    }

    try {
      const result = await getBiblePassage(input);
      console.log(`\n${input}\n`);
      result.forEach((v) => {
        console.log(`${v.verse}. ${v.text}`);
      });
      console.log();
    } catch {
      console.log(`Could not parse "${input}". Try "help" for usage.\n`);
    }

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("\nViszontlátásra!");
    process.exit(0);
  });
};
