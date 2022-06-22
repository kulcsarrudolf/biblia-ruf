function AppCommand(command, description) {
  this.command = command;
  this.description = description;
}

const help = () => {
  console.log("Parancsok: ");
  console.table([
    new AppCommand("--p", `Igerész megjelnítése. Pl. --p="Zsolt 139:23-24"`),
    new AppCommand("--showBibleBooks", `Könyvek listázása`),
  ]);

  console.log("\n");
  console.log("További részletek: https://github.com/kulcsarrudolf/biblia-ruf");
  console.log("Készítette: Kulcsár Rudolf");
};

module.exports = {
  help,
};
