const { getBiblePassage } = require("./src/");
const { showBibleBooks } = require("./src/");

const parseCommand = () => {
  const commands = process.argv;

  console.log(commands);
};

const main = () => {
  const command = process.argv.find(
    (val) => val.includes("--passage") || val.includes("--p")
  )
    ? "showBible"
    : "showBibleBooks";

  if (command === "showBible") {
    getBiblePassage();
  } else {
    showBibleBooks();
  }

  parseCommand();
};

main();
