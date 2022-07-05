function AppCommand(command, description) {
  this.command = command;
  this.description = description;
}

const help = () => {
  console.log("További részletek: https://github.com/kulcsarrudolf/biblia-ruf");
  console.log("Készítette: Kulcsár Rudolf");
};

module.exports = {
  help,
};
