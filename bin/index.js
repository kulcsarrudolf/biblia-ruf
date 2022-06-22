#!/usr/bin/env node

const { getBiblePassage, showBibleBooks, help } = require("../src");

const parseCommand = () => {
  const currentCommand = process.argv;

  const commandList = [
    { option: "--p", foo: getBiblePassage },
    { option: "--passage", foo: getBiblePassage },
    { option: "--showBooks", foo: showBibleBooks },
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
