#!/usr/bin/env node

const { getBiblePassage, getBibleBooks } = require("../src");
const { help } = require("./help");

const getBiblePassageCli = async () => {
  const passage = process.argv
    .find((val) => val.includes("--passage") || val.includes("--p"))
    .split("=")[1];

  const result = await getBiblePassage(passage);

  console.log(passage + "\n");

  result.forEach((v) => {
    console.log(`${v.verse}. ${v.text}`);
  });
};

const showBibleBooksCli = () => {
  const list = getBibleBooks();

  console.table(list);
};

const parseCommand = () => {
  const currentCommand = process.argv;

  const commandList = [
    { option: "--p", foo: getBiblePassageCli },
    { option: "--passage", foo: getBiblePassageCli },
    { option: "--showBooks", foo: showBibleBooksCli },
    { option: "--help", foo: help },
  ];

  commandList.forEach((c) => {
    if (currentCommand.find((val) => val.includes(c.option))) {
      c.foo();
    }
  });
};

const main = () => {
  parseCommand();
};

main();
