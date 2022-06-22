const { getBiblePassage } = require("./src/");
const { showBibleBooks } = require("./src/");
const { help } = require("./src/help");

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
